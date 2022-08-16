import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, Div2, H1, H2, Form, Input, Button, ControlStyle, LinkStyle, P, ErrorP } from './Signin.styles';
import { useTranslation } from 'react-i18next';
import { useSignInMutation } from 'service/signinHttp';

type FormData = {
  email: string;
  password: string;
}

const schema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().min(8).required(),
}).required();

const signIn = () => {
  const [signIn] = useSignInMutation();
  const navigate = useNavigate();
  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<FormData> = async (values: object) => {
    await signIn(values);
    alert('You have sucessfully logged in');
    reset({ email: '', password: '' });
    navigate('/home');
  };

  return (
    <Div>
      <H1>{`${t('SignIn.title')}`}</H1>
      <H2>{`${t('SignIn.upperText')}`}</H2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ControlStyle>{`${t('SignIn.email')}`}</ControlStyle>
          <Controller
            render={({ field }) => <Input type="text" {...field} />}
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
          <LinkStyle><Link to="/forgot-passowrd">{`${t('SignIn.forgotPassword')}`}</Link></LinkStyle>
          <ErrorP>{errors.password?.message}</ErrorP>
        <Button type="submit">{`${t('SignIn.buttonSignin')}`}</Button>
      </Form>
      <Div2>
        <P>{`${t('SignIn.text')}`}</P>
        <Link to="/signup">{`${t('SignIn.registerLink')}`}</Link>
      </Div2>
    </Div>
  );
}

export default signIn;