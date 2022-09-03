import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, Form, Input, Button, H4, Message } from './Forgot.styles';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordMutation } from 'service/httpService';

export type FormEmail = {
	email: string;
};

const schema = Yup.object({
	email: Yup.string().email().required(),
}).required();

const forgotPassword = () => {
	const [forgot] = useForgotPasswordMutation();

	const { handleSubmit, control, reset } = useForm<FormEmail>({
		resolver: yupResolver(schema),
	});

	const { t } = useTranslation();

	const onSubmit: SubmitHandler<FormEmail> = async values => {
		try {
			await forgot(values).unwrap();
			reset({ email: '' });
		} catch (e) {
			reset({ email: '' });
			console.log(e);
		}
	};

	return (
		<Div>
			<H4>{`${t('ForgotPassword.title')}`}</H4>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					render={({ field }) => <Input type="email" {...field} />}
					name="email"
					control={control}
					defaultValue=""
				/>
				<Button type="submit">{`${t('ForgotPassword.sendButton')}`}</Button>
			</Form>
			<Message>{`${t('ForgotPassword.message')}`}</Message>
		</Div>
	);
};

export default forgotPassword;
