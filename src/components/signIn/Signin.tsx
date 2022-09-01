import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { notification } from 'antd';
import {
	Div,
	Div2,
	H1,
	H2,
	Form,
	Input,
	Button,
	ControlStyle,
	LinkStyle,
	P,
	ErrorP,
} from './Signin.styles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'redux/hooks';
import { saveEmail, saveUserId } from 'redux/reducers/userSlice';
import { useSignInMutation } from 'service/httpService';

export type FormData = {
	email: string;
	password: string;
};

type Alert = 'success' | 'error';

const schema = Yup.object({
	email: Yup.string().required(),
	password: Yup.string().min(8).required(),
}).required();

const signIn = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [signIn] = useSignInMutation();
	const navigate = useNavigate();
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const alert = (type: Alert) => {
		notification[type]({
			message: type === 'success' ? `${t('SignIn.success')}` : `${t('SignIn.error')}`,
		});
	};

	const onSubmit: SubmitHandler<FormData> = async values => {
		const { email, password } = values;

		try {
			const res = await signIn({ email, password }).unwrap();
			dispatch(saveEmail(values.email));
			localStorage.setItem('userId', JSON.stringify(res));
			dispatch(saveUserId(res.userId));
			alert('success');
			reset({ email: '', password: '' });
			navigate('/welcome');
		} catch (e) {
			reset({ email: '', password: '' });
			alert('error');
			console.log(e);
		}
	};

	return (
		<Div>
			<H1>{`${t('SignIn.title')}`}</H1>
			<H2>{`${t('SignIn.upperText')}`}</H2>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ControlStyle>{`${t('SignIn.email')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="email" {...field} />}
					name="email"
					control={control}
					defaultValue=""
				/>
				<ControlStyle>{`${t('SignIn.password')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="password" {...field} />}
					name="password"
					control={control}
					defaultValue=""
				/>
				<LinkStyle>
					<Link to="/forgot-password">{`${t('SignIn.forgotPassword')}`}</Link>
				</LinkStyle>
				<ErrorP>{errors.password?.message}</ErrorP>
				<Button type="submit">{`${t('SignIn.buttonSignin')}`}</Button>
			</Form>
			<Div2>
				<P>{`${t('SignIn.text')}`}</P>
				<Link to="/sign-up">{`${t('SignIn.registerLink')}`}</Link>
			</Div2>
		</Div>
	);
};

export default signIn;
