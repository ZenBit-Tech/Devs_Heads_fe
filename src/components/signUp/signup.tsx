import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, Register, Form, ControlStyle, Input, P } from './signup.styled';
import { useTranslation } from 'react-i18next';
import { useSignUpMutation } from 'service/httpService';
import GoogleAuth from 'components/GoogleAuth/GoogleAuth';

export type FormData = {
	email: string;
	createPassword: string;
	password: string;
};

const schema = Yup.object({
	email: Yup.string().email().required(),
	createPassword: Yup.string().min(8).required(),
	password: Yup.string().min(8).required(),
}).required();

const signUp = () => {
	const [signUp] = useSignUpMutation();
	const [error, setError] = useState(false);
	const [sucess, setSucess] = useState(false);
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const { t } = useTranslation();

	const onSubmit: SubmitHandler<FormData> = async values => {
		const { email, password } = values;
		if (values.createPassword !== values.password) {
			alert('Invalid password');
			reset({ email: '', createPassword: '', password: '' });
		} else {
			await signUp({ email, password })
				.unwrap()
				.then(() => {
					setSucess(true);
					console.log(sucess);
					reset({ email: '', createPassword: '', password: '' });
					navigate('/registration');
				})
				.catch(() => {
					setError(true);
					console.log(error);
					reset({ email: '', createPassword: '', password: '' });
					alert('Invalid email or password');
				});
		}
	};

	return (
		<Div>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<P>{`${t('SignUp.quickSign')}`}</P>
				<GoogleAuth />
				<P>{`${t('SignUp.or')}`}</P>
				<P>{`${t('SignUp.textEmail')}`}</P>
				<ControlStyle>{`${t('SignUp.email')}`}</ControlStyle>
				<Controller
					render={({ field }: any) => <Input type="email" {...field} />}
					name="email"
					control={control}
					defaultValue=""
				/>
				<P>{errors.email?.message}</P>
				<ControlStyle>{`${t('SignUp.createPassword')}`}</ControlStyle>
				<Controller
					render={({ field }: any) => <Input type="password" {...field} />}
					name="createPassword"
					control={control}
					defaultValue=""
				/>
				<P>{errors.createPassword?.message}</P>
				<ControlStyle>{`${t('SignUp.password')}`}</ControlStyle>
				<Controller
					render={({ field }: any) => <Input type="password" {...field} />}
					name="password"
					control={control}
					defaultValue=""
				/>
				<P>{errors.password?.message}</P>
				<Register type="submit">{`${t('SignUp.register')}`}</Register>
			</Form>
		</Div>
	);
};

export default signUp;
