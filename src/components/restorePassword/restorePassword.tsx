import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { notification } from 'antd';
import {
	Div,
	Form,
	Input,
	Button,
	ControlStyle,
	ErrorP,
	H1,
} from 'components/restorePassword/restorePassword.style';
import { useTranslation } from 'react-i18next';
import { useResetPasswordMutation } from 'service/httpService';
import { saveUserId } from 'redux/reducers/userSlice';
import { useAppDispatch } from 'redux/hooks';

export type FormPass = {
	createPassword: string;
	password: string;
};

type Alert = 'success' | 'error';

const schema = Yup.object({
	createPassword: Yup.string().min(8).required(),
	password: Yup.string().min(8).required(),
}).required();

const resetPassword = () => {
	const [setPassword] = useResetPasswordMutation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormPass>({
		resolver: yupResolver(schema),
	});

	const { t } = useTranslation();

	const alert = (type: Alert) => {
		notification[type]({
			message: type === 'success' ? `${t('ResetPassword.success')}` : `${t('ResetPassword.error')}`,
		});
	};

	const { token } = useParams<{ token: string }>();

	useEffect(() => {
		const userToken = localStorage.getItem('hash');
		const userId = localStorage.getItem('userId');
		dispatch(saveUserId(Number(userId)));
		if (token === userToken) {
			navigate('/search-post');
		}
	}, []);

	const onSubmit: SubmitHandler<FormPass> = async values => {
		const { password } = values;
		if (values.createPassword !== values.password) {
			alert('error');
		} else {
			try {
				await setPassword({ password, token: token || '' }).unwrap();
				localStorage.setItem('hash', token || '');
				reset({ createPassword: '', password: '' });
				navigate('/sign-in');
			} catch (e) {
				reset({ createPassword: '', password: '' });
				alert('error');
				// console.log(e);
			}
		}
	};

	return (
		<Div>
			<H1>{`${t('ForgotPassword.title')}`}</H1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ControlStyle>{`${t('ResetPassword.newPassword')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="password" {...field} />}
					name="createPassword"
					control={control}
					defaultValue=""
				/>
				<ErrorP>{errors.createPassword?.message}</ErrorP>
				<ControlStyle>{`${t('ResetPassword.password')}`}</ControlStyle>
				<Controller
					render={({ field }) => <Input type="password" {...field} />}
					name="password"
					control={control}
					defaultValue=""
				/>
				<ErrorP>{errors.password?.message}</ErrorP>
				<Button type="submit">{`${t('SignUp.register')}`}</Button>
			</Form>
		</Div>
	);
};

export default resetPassword;
