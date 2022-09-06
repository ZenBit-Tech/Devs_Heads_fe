import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, Register, Form, ControlStyle, Input, P, ErrorP } from './signup.styled';
import { useTranslation } from 'react-i18next';
import { useSignUpMutation } from 'service/httpService';
import GoogleAuth from 'components/GoogleAuth/GoogleAuth';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { saveEmail, saveUserId } from 'redux/reducers/userSlice';
import { notification } from 'antd';
import { RootState } from 'redux/store';

export type FormData = {
	email: string;
	createPassword: string;
	password: string;
	role: string;
};

type Alert = 'success' | 'error';

const schema = Yup.object({
	email: Yup.string().email().required(),
	createPassword: Yup.string().min(8).required(),
	password: Yup.string().min(8).required(),
}).required();

const signUp = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [signUp] = useSignUpMutation();
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const alert = (type: Alert) => {
		notification[type]({
			message: type === 'success' ? `${t('SignUp.errorPasswords')}` : `${t('SignUp.errorEmail')}`,
		});
	};

	const { user } = useAppSelector<RootState>(state => state);

	const onSubmit: SubmitHandler<FormData> = async values => {
		const { email, password } = values;
		values = { ...values, role: user.role };
		if (values.createPassword !== values.password) {
			alert('success');
			reset({ email: '', createPassword: '', password: '' });
		} else {
			try {
				const res = await signUp({ email, password, role: user.role }).unwrap();
				localStorage.setItem('userId', JSON.stringify(res.id));
				dispatch(saveUserId(res.id));
				dispatch(saveEmail(email));
				reset({ email: '', createPassword: '', password: '' });
				navigate('/welcome');
			} catch (e) {
				alert('error');
				console.log(e);
				reset({ email: '', createPassword: '', password: '' });
			}
		}
	};

	return (
		<Div>
			<P>{`${t('SignUp.quickSign')}`}</P>
			<GoogleAuth />
			<P>{`${t('SignUp.or')}`}</P>
			<P>{`${t('SignUp.textEmail')}`}</P>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ControlStyle>{`${t('SignUp.email')}`}</ControlStyle>
				<Controller
					render={({ field }: any) => <Input type="email" {...field} />}
					name="email"
					control={control}
					defaultValue=""
				/>
				<ErrorP>{errors.email?.message}</ErrorP>
				<ControlStyle>{`${t('SignUp.createPassword')}`}</ControlStyle>
				<Controller
					render={({ field }: any) => <Input type="password" {...field} />}
					name="createPassword"
					control={control}
					defaultValue=""
				/>
				<ErrorP>{errors.createPassword?.message}</ErrorP>
				<ControlStyle>{`${t('SignUp.password')}`}</ControlStyle>
				<Controller
					render={({ field }: any) => <Input type="password" {...field} />}
					name="password"
					control={control}
					defaultValue=""
				/>
				<ErrorP>{errors.password?.message}</ErrorP>
				<Register type="submit">{`${t('SignUp.register')}`}</Register>
			</Form>
		</Div>
	);
};

export default signUp;
