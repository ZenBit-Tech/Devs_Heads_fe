import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../redux/hooks';
import { email, password } from '../../redux/reducers/signUp';
import { Div, Button, Register, Form, Label, Input, P } from './signup.styled';

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

  return (
    <Div>
      <Form onSubmit={formik.handleSubmit }>
        <P>Quick Sign Up</P>
        <Button>Sign Up With Google</Button>
        <P>Or</P>
        <P>Use your email</P>
        <Label>
          Email
          <Input
            id="email"
            name="email" 
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </Label>
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <Label>
          Create a password
          <Input
            id="createPassword"
            name="createPassword" 
            type="password" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.createPassword}
          />
        </Label>
        {formik.touched.createPassword && formik.errors.createPassword ? <div>{formik.errors.createPassword}</div> : null}
        <Label>
          Confirm password
          <Input
            id="password"
            name="password" 
            type="password" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </Label>
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <Register type="submit">Register</Register>
      </Form>
    </Div>
  );
};

export default signUp;