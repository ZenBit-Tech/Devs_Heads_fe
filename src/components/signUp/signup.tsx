import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../redux/hooks';
import { email, password } from '../../redux/reducers/signUp';
import { Div, Button, Register, Form, Label, Input, P } from './signup.styled';

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
  const { register, handleSubmit, reset, formState: { errors} } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {email: '', createPassword: '', password: ''}
  });
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((values) => {
    dispatch(email(values.email));
    dispatch(password(values.password));
    alert('successfully submitted');
    reset({ email: '', createPassword: '', password: ''});
  });
  

  return (
    <Div>
      <Form onSubmit={onSubmit}>
        <P>Quick Sign Up</P>
        <Button>Sign Up With Google</Button>
        <P>Or</P>
        <P>Use your email</P>
        <Label>
          Email
          <Input
            id="email"
            type="email"
            {...register("email")}
          />
        </Label>
        <P>{errors.email?.message}</P>
        <Label>
          Create a password
          <Input
            id="createPassword"
            type="password" 
            {...register("createPassword")}
          />
        </Label>
        <P>{errors.createPassword?.message}</P>
        <Label>
          Confirm password
          <Input
            id="password"
            type="password" 
            {...register("password")}
          />
        </Label>
        <P>{errors.password?.message}</P>
        <Register type="submit">Register</Register>
      </Form>
    </Div>
  );
};

export default signUp;