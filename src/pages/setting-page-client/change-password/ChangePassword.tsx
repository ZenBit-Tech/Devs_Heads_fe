import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox } from 'antd';
import { notification } from 'antd';
import {
	Form,
	Input,
	Button,
	ControlStyle,
	ErrorP,
	InputBlock,
	LabelBlock,
	Title,
	GlobalStyle,
	Cancel,
	ButtonBlock,
} from './ChangePassword.styles';
import { useTranslation } from 'react-i18next';
import { usePasswordChangeMutation } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

export type FormPass = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	email: string;
};

export interface Error {
	data: {
		message: string;
	};
}
type Alert = 'success' | 'error';
const schema = Yup.object({
	oldPassword: Yup.string().required(),
	newPassword: Yup.string()
		.required()
		.matches(/^(?=.{8,})/, 'Must Contain at least 8 digits')
		.matches(/^(?=.*[0-9])/, 'Must Contain at least one Number')
		.matches(/^(?=.*[!@#\$%\^&\*])/, 'Must Contain at least one Symbols'),
	confirmPassword: Yup.string().required(),
}).required();

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
		resolver: yupResolver(schema),
	});

	const { t } = useTranslation();

	const alert = (type: Alert, message: string) => {
		notification[type]({
			message: message,
		});
	};

	const onChange = (e: { target: { checked: boolean } }) => {
		setPasswordShown(e.target.checked);
	};

	const onCancelButton = () => {
		reset({ oldPassword: '', newPassword: '', confirmPassword: '' });
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
				reset({ oldPassword: '', newPassword: '', confirmPassword: '' });
				alert('success', 'Password changed successfully!');
			} catch (e) {
				reset({ oldPassword: '', newPassword: '', confirmPassword: '' });
				console.log(e);
				alert('error', (e as Error).data.message);
			}
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<GlobalStyle />
			<Title>{`${t('ChangePassword.changePassword')}`}</Title>
			<InputBlock>
				<ControlStyle>{`${t('ChangePassword.oldPassword')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="password" {...field} />}
					name="oldPassword"
					control={control}
					defaultValue=""
				/>
			</InputBlock>
			<ErrorP>{errors.oldPassword?.message}</ErrorP>
			<InputBlock>
				<LabelBlock>
					<ControlStyle>{`${t('ChangePassword.newPassword')}`}</ControlStyle>
					<Checkbox onChange={onChange}>{`${t('ChangePassword.showPassword')}`}</Checkbox>
				</LabelBlock>
				<Controller
					render={({ field }) => <Input type={passwordShown ? 'text' : 'password'} {...field} />}
					name="newPassword"
					control={control}
					defaultValue=""
				/>
			</InputBlock>
			<ErrorP>{errors.newPassword?.message}</ErrorP>
			<InputBlock>
				<ControlStyle>{`${t('ChangePassword.confirmPassword')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="password" {...field} />}
					name="confirmPassword"
					control={control}
					defaultValue=""
				/>
			</InputBlock>
			<ErrorP>{errors.confirmPassword?.message}</ErrorP>
			<ButtonBlock>
				<Button type="submit">{`${t('ChangePassword.saveButton')}`}</Button>
				<Cancel onClick={onCancelButton}>{`${t('ChangePassword.cancel')}`}</Cancel>
			</ButtonBlock>
		</Form>
	);
};

export default ChangePassword;
