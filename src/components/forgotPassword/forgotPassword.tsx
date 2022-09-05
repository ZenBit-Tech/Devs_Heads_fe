import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, Form, Input, Button, ControlStyle, ErrorP, H1, P } from './Forgot.styles';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordMutation } from 'service/httpService';
import { t } from 'i18next';

export type FormEmail = {
	email: string;
};

const schema = Yup.object({
	email: Yup.string()
		.email()
		.required(`${t('ForgotPassword.emailReq')}`),
}).required();

const forgotPassword = () => {
	const [forgot] = useForgotPasswordMutation();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormEmail>({
		resolver: yupResolver(schema),
	});

	const { t } = useTranslation();

	const onSubmit: SubmitHandler<FormEmail> = async values => {
		try {
			await forgot(values).unwrap();
			reset({ email: '' });
		} catch (e) {
			reset({ email: '' });
			// console.log(e);
		}
	};

	return (
		<Div>
			<H1>{`${t('ForgotPassword.title')}`}</H1>
			<P>{`${t('ForgotPassword.instruction')}`}</P>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ControlStyle>{`${t('ForgotPassword.email')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="email" {...field} />}
					name="email"
					control={control}
					defaultValue=""
				/>
				<ErrorP>{errors.email?.message}</ErrorP>
				<Button type="submit">{`${t('ForgotPassword.sendButton')}`}</Button>
			</Form>
		</Div>
	);
};

export default forgotPassword;
