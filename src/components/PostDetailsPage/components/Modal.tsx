import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
	Wrapper,
	StyledModal,
	CloseButton,
	Content,
	Backdrop,
	Form,
	Label,
	Button,
	P,
} from 'components/PostDetailsPage/components/Modal.styles';
import { t } from 'i18next';
import {
	usePostProposalMutation,
	useCreateRoomMutation,
	usePostMessageMutation,
} from 'service/httpService';
import { notification } from 'antd';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

interface ModalProps {
	isShown: boolean;
	hide: () => void;
	setDisable: (disable: boolean) => void;
	jobPostId: number;
	receiverId: number;
	clientId: number;
	setIsShown: (disable: boolean) => void;
}

type ProposalForm = {
	price: number;
	message: string;
};

type NotificationType = 'success' | 'error';

const Schema = Yup.object().shape({
	price: Yup.number().required().positive(),
	message: Yup.string()
		.required(`${t('PostDetailPage.fieldIsRequired')}`)
		.min(6, `${t('PostDetailPage.minLength')}`)
		.max(50, `${t('PostDetailPage.maxLength')}`),
});

export const HandleModal: FunctionComponent<ModalProps> = ({
	isShown,
	hide,
	clientId,
	setDisable,
	setIsShown,
	jobPostId,
	receiverId,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProposalForm>({
		resolver: yupResolver(Schema),
	});
	const [sendForm] = usePostProposalMutation();
	const [createRoom] = useCreateRoomMutation();
	const [sendMessage] = usePostMessageMutation();
	const { user } = useAppSelector<RootState>(state => state);

	const openNotificationWithIcon = (type: NotificationType) => {
		notification[type]({
			message:
				type === 'success' ? `${t('PostDetailPage.success')}` : `${t('PostDetailPage.error')}`,
			description:
				type === 'success'
					? `${t('PostDetailPage.proposalSent')}`
					: `${t('PostDetailPage.someErrorOccurred')}`,
		});
		setIsShown(false);
	};

	const handleForm = async (data: ProposalForm) => {
		await sendForm({ ...data, jobPost: jobPostId, userId: user.id, userIdClient: clientId })
			.unwrap()
			.then(() => {
				openNotificationWithIcon('success');
			})
			.catch(() => openNotificationWithIcon('error'));
		setDisable(true);
		const room = await createRoom({
			jobPostId: jobPostId,
			senderId: user.id,
			receiverId: receiverId,
		}).unwrap();
		const chatRoomId = room?.id;
		await sendMessage({
			chatRoomId,
			text: data.message,
			jobLink: `/post-job/${jobPostId}`,
			userId: user.id,
		});
		hide();
	};

	const modal = (
		<React.Fragment>
			<Backdrop />
			<Wrapper>
				<StyledModal>
					<CloseButton onClick={hide}>X</CloseButton>
					<Content>
						<Form onSubmit={handleSubmit(handleForm)}>
							<div>
								<Label>{`${t('PostDetailPage.hourTitle')}`}</Label>
								<div className="input-group-prepend">
									<span className="input-group-text">$</span>
									<input
										type="text"
										{...register('price')}
										className={`form-control ${errors.price ? 'is-invalid' : ''}`}
									/>
								</div>
								{errors.price && <P>{`${t('PostDetailPage.priceError')}`}</P>}
							</div>
							<div>
								<Label>{`${t('PostDetailPage.CVTitle')}`}</Label>
								<input
									type="text"
									{...register('message')}
									className={`form-control ${errors.message ? 'is-invalid' : ''}`}
								/>
								{errors.message && <P>{errors.message?.message}</P>}
							</div>
							<Button className="btn btn-success">{`${t('PostDetailPage.sendBtn')}`}</Button>
						</Form>
					</Content>
				</StyledModal>
			</Wrapper>
		</React.Fragment>
	);
	return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default HandleModal;
