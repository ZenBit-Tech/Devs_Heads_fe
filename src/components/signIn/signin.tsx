import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../redux/hooks';
import { email, password } from '../../redux/reducers/signin';

type FormData = {
  email: string;
  password: string;
}

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
}).required();

const signIn: FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {email: '', password: ''}
  });
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((values) => {
    dispatch(email(values.email));
    dispatch(password(values.password));
    reset({ email: '', password: '' });
  });

  return (
    <>
      <h1>Get Job</h1>
      <h2>THE BEST WAY TO FIND YOUR JOB!</h2>
      <form onSubmit={onSubmit}>
        <label>
          Username or Email
          <input
            id="email"
            type="email"
            {...register("email")}
          />
        </label>
        <p>{errors.email?.message}</p>
        <label>
          Password
          <input
            id="password"
            type="password" 
            {...register("password")}
          />
          <Link to="">Forgot your password?</Link>
        </label>
        <p>{errors.password?.message}</p>
        <button type="submit">Sign In</button>
      </form>
      <p>Don`t have an account yet?</p>
      <Link to="/signup">Register Now</Link>
    </>
  );
}

export default signIn;