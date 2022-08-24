import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Div,
	Form,
	Input,
	Button,
	ControlStyle,
	ErrorP,
} from 'components/forgotPassword/Forgot.styles';
import { useTranslation } from 'react-i18next';

export type FormPass = {
	createPassword: string;
	password: string;
};

const schema = Yup.object({
	email: Yup.string().email().required(),
}).required();

const resetPassword = () => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormPass>({
		resolver: yupResolver(schema),
	});

	const { t } = useTranslation();

	const onSubmit: SubmitHandler<FormPass> = async values => {
		try {
			console.log(values);
			reset({ createPassword: '', password: '' });
		} catch (e) {
			reset({ createPassword: '', password: '' });
			console.log(e);
		}
	};

	return (
		<Div>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ControlStyle>{`${t('ForgotPassword.email')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="password" {...field} />}
					name="createPassword"
					control={control}
					defaultValue=""
				/>
				<ErrorP>{errors.createPassword?.message}</ErrorP>
				<ControlStyle>{`${t('ForgotPassword.email')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="password" {...field} />}
					name="password"
					control={control}
					defaultValue=""
				/>
				<ErrorP>{errors.createPassword?.message}</ErrorP>
				<Button type="submit">{`${t('ForgotPassword.sendButton')}`}</Button>
			</Form>
		</Div>
	);
};

export default resetPassword;
