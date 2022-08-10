import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../redux/hooks';
import { email, password } from '../../redux/reducers/signUp';
import { Div, Button, Register, Form, Label, Input, P } from './signup.styled';
import { useTranslation } from 'react-i18next';

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

const signUp: FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors} } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {email: '', createPassword: '', password: ''}
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = handleSubmit((values) => {
    dispatch(email(values.email));
    dispatch(password(values.password));
    reset({ email: '', createPassword: '', password: ''});
    navigate('/registration');
  });

  return (
    <Div>
      <Form onSubmit={onSubmit}>
        <P>{`${t('SignUp.quickSign')}`}</P>
        <Button>{`${t('SignUp.buttonGoogle')}`}</Button>
        <P>{`${t('SignUp.or')}`}</P>
        <P>{`${t('SignUp.textEmail')}`}</P>
        <Label>
          {`${t('SignUp.email')}`}
          <Input
            id="email"
            type="email"
            {...register("email")}
          />
        </Label>
        <P>{errors.email?.message}</P>
        <Label>
        {`${t('SignUp.createPassword')}`}
          <Input
            id="createPassword"
            type="password" 
            {...register("createPassword")}
          />
        </Label>
        <P>{errors.createPassword?.message}</P>
        <Label>
        {`${t('SignUp.password')}`}
          <Input
            id="password"
            type="password" 
            {...register("password")}
          />
        </Label>
        <P>{errors.password?.message}</P>
        <Register type="submit">{`${t('SignUp.register')}`}</Register>
      </Form>
    </Div>
  );
};

export default signUp;