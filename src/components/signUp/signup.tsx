import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../redux/hooks';
import { email, password } from '../../redux/reducers/signUp';


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
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default signUp;