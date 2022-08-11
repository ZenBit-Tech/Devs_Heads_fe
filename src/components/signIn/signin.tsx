import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'redux/hooks';
import { email } from 'redux/reducers/signin';
import { useTranslation } from 'react-i18next';

type FormData = {
  email: string;
  password: string;
}

const schema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().min(8).required(),
}).required();

const signIn: FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<FormData> = values => {
    dispatch(email(values.email));
      // alert('Invalid Email or Password');
    alert('You have sucessfully logged in');
    reset({ email: '', password: '' });
    navigate('/home');
  };

  return (
    <>
      <h1>{`${t('SignIn.title')}`}</h1>
      <h2>{`${t('SignIn.upperText')}`}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>{`${t('SignIn.email')}`}</label>
          <Controller
            render={({ field }) => <input type="text" {...field} />}
            name="email"
            control={control}
            defaultValue="" 
          />
          {errors.email?.message}
        <label>{`${t('SignIn.password')}`}</label>
          <Controller
            render={({ field }) => <input type="password" {...field} />}
            name="password"
            control={control}
            defaultValue=""
          />
          <p>{errors.password?.message}</p>
          <Link to="">{`${t('SignIn.forgotPassword')}`}</Link>
        <button type="submit">{`${t('SignIn.buttonSignin')}`}</button>
      </form>
      <p>{`${t('SignIn.text')}`}</p>
      <Link to="/signup">{`${t('SignIn.registerLink')}`}</Link>
    </>
  );
}

export default signIn;