import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox } from 'antd';
import { notification } from 'antd';
import {
	Form,
	Button,
	LabelBlock,
	GlobalStyle,
	Cancel,
	ButtonBlock,
} from './ChangePassword.styles';
import { Input, Title, Column, MainTitle, P } from 'components/clientSettings/clentSettings.styles';
import { useTranslation } from 'react-i18next';
import { usePasswordChangeMutation } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import ValidationSchema from './ValidationSchema';

export type FormPass = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	email: string;
};

export type Alert = 'success' | 'error';

export interface Error {
	data: {
		message: string;
	};
}

const ChangePassword = () => {
	const [passwordShown, setPasswordShown] = useState<boolean>(false);
	const [setPassword] = usePasswordChangeMutation();
	const { user } = useAppSelector<RootState>(state => state);
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormPass>({
		resolver: yupResolver(ValidationSchema),
	});

	const { t } = useTranslation();

	const resetInput = () => {
		return reset({ oldPassword: '', newPassword: '', confirmPassword: '' });
	};

	const alert = (type: Alert, message: string) => {
		notification[type]({
			message: message,
		});
	};

	const onChange = (e: { target: { checked: boolean } }) => {
		setPasswordShown(e.target.checked);
	};

	const onCancelButton = () => {
		resetInput();
	};

	const onSubmit: SubmitHandler<FormPass> = async values => {
		const { oldPassword, newPassword } = values;
		if (values.newPassword !== values.confirmPassword) {
			alert('error', 'Please check equality passwords');
		} else {
			try {
				await setPassword({
					oldPassword: oldPassword,
					newPassword: newPassword,
					email: user.email || '',
				}).unwrap();
				resetInput();
				alert('success', 'Password changed successfully!');
			} catch (e) {
				resetInput();
				console.log(e);
				alert('error', (e as Error).data.message);
			}
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<GlobalStyle />
			<MainTitle>{`${t('ChangePassword.changePassword')}`}</MainTitle>
			<Column>
				<Title>{`${t('ChangePassword.oldPassword')}`}</Title>
				<Controller
					render={({ field }) => (
						<Input
							className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
							type="password"
							{...field}
						/>
					)}
					name="oldPassword"
					control={control}
					defaultValue=""
				/>
			</Column>
			<P>{errors.oldPassword?.message}</P>
			<Column>
				<LabelBlock>
					<Title>{`${t('ChangePassword.newPassword')}`}</Title>
					<Checkbox onChange={onChange}>{`${t('ChangePassword.showPassword')}`}</Checkbox>
				</LabelBlock>
				<Controller
					render={({ field }) => (
						<Input
							className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
							type={passwordShown ? 'text' : 'password'}
							{...field}
						/>
					)}
					name="newPassword"
					control={control}
					defaultValue=""
				/>
			</Column>
			<P>{errors.newPassword?.message}</P>
			<Column>
				<Title>{`${t('ChangePassword.confirmPassword')}`}</Title>
				<Controller
					render={({ field }) => (
						<Input
							className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
							type="password"
							{...field}
						/>
					)}
					name="confirmPassword"
					control={control}
					defaultValue=""
				/>
			</Column>
			<P>{errors.confirmPassword?.message}</P>
			<ButtonBlock>
				<Button type="submit">{`${t('ChangePassword.saveButton')}`}</Button>
				<Cancel onClick={onCancelButton}>{`${t('ChangePassword.cancel')}`}</Cancel>
			</ButtonBlock>
		</Form>
	);
};

export default ChangePassword;
