import React, { FunctionComponent, useState } from 'react';
import ReactDOM from 'react-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Wrapper,
	StyledModal,
	CloseButton,
	Content,
	Backdrop,
	Form,
	Label,
	P,
} from 'components/PostDetailsPage/components/Modal.styles';
import { ButtonBlock, ContainerDate, DateBlock, Title } from './sendOffer.styles';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { Cancel, Button } from 'pages/setting-page-client/change-password/ChangePassword.styles';
import { t } from 'i18next';
import { useGetClientInfoByUserQuery, usePostOfferMutation } from 'service/httpService';
import { notification } from 'antd';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { useForm } from 'react-hook-form';
import { ModalProps, NotificationType, OfferForm, Schema } from './data';

export const SendOfferPopup: FunctionComponent<ModalProps> = ({
	isShown,
	setIsShown,
	hide,
	freelancerId,
	jopPostId,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<OfferForm>({
		resolver: yupResolver(Schema),
	});
	const [sendForm] = usePostOfferMutation();
	const { user } = useAppSelector<RootState>(state => state);
	const { data: clientInfo } = useGetClientInfoByUserQuery(user.id);
	console.log(clientInfo);

	const resetInput = () => {
		return reset({ price: 0, startDate: {}, endDate: {} });
	};

	const openNotificationWithIcon = (type: NotificationType) => {
		notification[type]({
			message:
				type === 'success' ? `${t('SendOfferPopup.success')}` : `${t('SendOfferPopup.error')}`,
			description:
				type === 'success'
					? `${t('SendOfferPopup.offerSent')}`
					: `${t('SendOfferPopup.someErrorOccurred')}`,
		});
	};

	const handleForm = async (data: OfferForm) => {
		console.log(data);
		await sendForm({ ...data, freelancerId: freelancerId, jopPostId: jopPostId })
			.unwrap()
			.then(() => {
				openNotificationWithIcon('success');
			})
			.catch(() => openNotificationWithIcon('error'));
		setIsShown(false);
		resetInput();
	};

	const modal = (
		<React.Fragment>
			<Backdrop />
			<Wrapper style={{ maxWidth: '50%' }}>
				<StyledModal>
					<CloseButton onClick={hide}>X</CloseButton>
					<Content>
						<Form onSubmit={handleSubmit(handleForm)}>
							<Title>{`${t('SendOfferPopup.offer')}`}</Title>
							<div>
								<Label>{`${t('SendOfferPopup.companyName')}`}</Label>
								<Input type="text" {...register('name')} defaultValue={clientInfo?.name} />
							</div>
							<div>
								<Label>{`${t('SendOfferPopup.price')}`}</Label>
								<div className="input-group-prepend">
									<span className="input-group-text">$</span>
									<Input
										type="text"
										{...register('price')}
										className={`form-control ${errors.price ? 'is-invalid' : ''}`}
									/>
								</div>
								{errors.price && <P>{`${t('SendOfferPopup.priceError')}`}</P>}
							</div>
							<ContainerDate>
								<DateBlock>
									<Label>{`${t('SendOfferPopup.startDate')}`}</Label>
									<Input
										type="date"
										{...register('startDate')}
										className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
									/>
									{errors.startDate && <P>{errors.startDate?.message}</P>}
								</DateBlock>
								<DateBlock>
									<Label>{`${t('SendOfferPopup.endDate')}`}</Label>
									<Input
										type="date"
										{...register('endDate')}
										className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
									/>
									{errors.endDate && <P>{errors.endDate?.message}</P>}
								</DateBlock>
							</ContainerDate>
							<ButtonBlock>
								<Button type="submit">{`${t('SendOfferPopup.saveButton')}`}</Button>
								<Cancel onClick={resetInput}>{`${t('SendOfferPopup.cancel')}`}</Cancel>
							</ButtonBlock>
						</Form>
					</Content>
				</StyledModal>
			</Wrapper>
		</React.Fragment>
	);
	return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default SendOfferPopup;
