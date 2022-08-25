import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Alert, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { phoneNumberRegExp } from 'constants/reg-exps';
import {
	Container,
	Form,
	StyledLabel,
	StyledInput,
	InputBlock,
	SaveButton,
} from './ContactInfo.styles';
import { usePostProfileInfoMutation } from 'service/httpService';
import { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

export interface IContactInfoForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}
type NotificationType = 'success' | 'error';

const phoneRegExp = new RegExp(phoneNumberRegExp);

export const ContactInfo = () => {
	const { t } = useTranslation();

	const [sendForm] = usePostProfileInfoMutation();

	const { user } = useAppSelector<RootState>(state => state);
	const userEmail = user.email;
	const userId = user.id;
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IContactInfoForm>({ defaultValues: { email: userEmail } });

	const onSubmit: SubmitHandler<IContactInfoForm> = async data => {
		await sendForm({ ...data, id: userId })
			.unwrap()
			.then(() => {
				openNotificationWithIcon('success');
			})
			.catch(() => openNotificationWithIcon('error'));
	};

	const openNotificationWithIcon = (type: NotificationType) => {
		notification[type]({
			message: type === 'success' ? `${t('ContactInfo.success')}` : `${t('ContactInfo.error')}`,
			description:
				type === 'success'
					? `${t('ContactInfo.dataHasBeenSaved')}`
					: `${t('ContactInfo.someErrorOccurred')}`,
		});
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<InputBlock>
					<StyledLabel>{`${t('ContactInfo.firstName')}`}</StyledLabel>
					<div>
						<Controller
							name="firstName"
							control={control}
							defaultValue=""
							rules={{
								required: { value: true, message: `${t('ProfileEdit.fieldIsRequired')}` },
							}}
							render={({ field }) => <StyledInput {...field} />}
						/>
						{errors.firstName && (
							<Alert message={errors.firstName.message} type="warning" showIcon />
						)}
					</div>
				</InputBlock>
				<InputBlock>
					<StyledLabel>{`${t('ContactInfo.lastName')}`}</StyledLabel>
					<div>
						<Controller
							name="lastName"
							control={control}
							defaultValue=""
							rules={{
								required: { value: true, message: `${t('ProfileEdit.fieldIsRequired')}` },
							}}
							render={({ field }) => <StyledInput {...field} />}
						/>
						{errors.lastName && <Alert message={errors.lastName.message} type="warning" showIcon />}
					</div>
				</InputBlock>
				<InputBlock>
					<StyledLabel>{`${t('ContactInfo.email')}`}</StyledLabel>
					<Controller
						name="email"
						control={control}
						render={({ field }) => <StyledInput disabled {...field} />}
					/>
				</InputBlock>
				<InputBlock>
					<StyledLabel>{`${t('ContactInfo.phone')}`}</StyledLabel>
					<div>
						<Controller
							name="phone"
							control={control}
							defaultValue=""
							rules={{
								required: { value: true, message: `${t('ProfileEdit.fieldIsRequired')}` },
								pattern: {
									value: phoneRegExp,
									message: `${t('ContactInfo.wrongPhoneNumberPattern')}`,
								},
							}}
							render={({ field }) => <StyledInput {...field} />}
						/>
						{errors.phone && <Alert message={errors.phone.message} type="warning" showIcon />}
					</div>
				</InputBlock>
				<SaveButton>{`${t('ProfileEdit.saveButton')}`}</SaveButton>
			</Form>
		</Container>
	);
};
