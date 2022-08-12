import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, Button, Register, Form, ControlStyle, Input, P } from './signup.styled';
import { useTranslation } from 'react-i18next';
import { useSignUpMutation } from 'service/httpService';

type FormData =  {
  email: string;
  createPassword: string;
  password: string;
}


const schema = Yup.object({
  email: Yup.string().email().required(),
  createPassword: Yup.string().min(8).required(),
  password: Yup.string().min(8).required(),
}).required();

const signUp = () => {
  const [signUp, {isLoading}] = useSignUpMutation();
  const navigate = useNavigate();
  const { control, handleSubmit, reset, formState: { errors} } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();
  
  const onSubmit: SubmitHandler<FormData> = async (values: object) => {
    await signUp(values)
    console.log(isLoading);
    
    reset({ email: '', createPassword: '', password: ''});
    navigate('/registration');
  };

  return (
    <Div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <P>{`${t('SignUp.quickSign')}`}</P>
        <Button>{`${t('SignUp.buttonGoogle')}`}</Button>
        <P>{`${t('SignUp.or')}`}</P>
        <P>{`${t('SignUp.textEmail')}`}</P>
        <ControlStyle>{`${t('SignUp.email')}`}</ControlStyle>
          <Controller
            render={({ field }) => <Input  type="email" {...field}/>}
            name="email"
            control={control}
            defaultValue=""
          />
          <P>{errors.email?.message}</P>
        <ControlStyle>{`${t('SignUp.createPassword')}`}</ControlStyle>
          <Controller
            render={({ field }) => <Input type="password" {...field}/>}
            name="createPassword"
            control={control}
            defaultValue=""
          />
          <P>{errors.createPassword?.message}</P>
        <ControlStyle>{`${t('SignUp.password')}`}</ControlStyle>
          <Controller
              render={({ field }) => <Input type="password" {...field } />}
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