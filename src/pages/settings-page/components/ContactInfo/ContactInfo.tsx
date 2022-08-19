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
import { useAppSelector } from 'redux/hooks';
import { usePostProfileInfoMutation } from 'service/httpService';

export interface IContactInfoForm {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}
type NotificationType = 'success' | 'error';

const phoneRegExp = new RegExp(phoneNumberRegExp);

export const ContactInfo = () => {
	const { t } = useTranslation();

	const [sendForm] = usePostProfileInfoMutation();

	const userEmail = useAppSelector(() => 'user@email.puthere');
	const some = useAppSelector(state => state.auth.mutations);

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<IContactInfoForm>();

	const onSubmit: SubmitHandler<IContactInfoForm> = async data => {
		await sendForm(data)
			.unwrap()
			.then(() => openNotificationWithIcon('success'))
			.catch(() => openNotificationWithIcon('error'));
		reset();
		console.log(some);
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
							rules={{ required: { value: true, message: `${t('ProfileEdit.fieldIsRequired')}` } }}
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
							rules={{ required: { value: true, message: `${t('ProfileEdit.fieldIsRequired')}` } }}
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
						defaultValue={userEmail}
						render={({ field }) => <StyledInput disabled {...field} />}
					/>
				</InputBlock>
				<InputBlock>
					<StyledLabel>{`${t('ContactInfo.phone')}`}</StyledLabel>
					<div>
						<Controller
							name="phoneNumber"
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
						{errors.phoneNumber && (
							<Alert message={errors.phoneNumber.message} type="warning" showIcon />
						)}
					</div>
				</InputBlock>
				<SaveButton>{`${t('ProfileEdit.saveButton')}`}</SaveButton>
			</Form>
		</Container>
	);
};
