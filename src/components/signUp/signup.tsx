import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../redux/hooks';
import { email, password } from '../../redux/reducers/signUp';
import image from '../../image/google.jpg';
import styled from 'styled-components';

const signUp: FC = () => {
  const dispatch = useAppDispatch();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      createPassword: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required(),
      createPassword: Yup.string().min(8, 'The minimum length is 8 characters').required(),
      password: Yup.string().min(8, 'The minimum length is 8 characters').required(),
    }),
    onSubmit: (values) => {
      dispatch(email(values.email));
      dispatch(password(values.password));
      formik.handleReset(values)
    },
  });

  const Button = styled.button`
  text-align: right;
  background: rgb(67, 67, 194);
  background-image: url(${image});
  background-repeat: no-repeat;
  background-size: 40px;
  border: none;
  border-radius: 3px;
  color: white;
  padding: 8px;
  padding-right: 20px;
  height: 40px;
  width: 200px;`;

  return (
    <>
      <form onSubmit={formik.handleSubmit }>
        <Button>Sign Up With Google</Button>
        <label>
          Email
          <input
            id="email"
            name="email" 
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </label>
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <label>
          Create a password
          <input
            id="createPassword"
            name="createPassword" 
            type="password" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.createPassword}
          />
        </label>
        {formik.touched.createPassword && formik.errors.createPassword ? <div>{formik.errors.createPassword}</div> : null}
        <label>
          Confirm password
          <input
            id="password"
            name="password" 
            type="password" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </label>
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <button style={{color: 'blue'}} type="submit">Register</button>
      </form>
    </>
  );
};

export default signUp;