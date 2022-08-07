import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../redux/hooks';
import { email, password } from '../../redux/reducers/signIn';
const signIn: FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required(),
      password: Yup.string().min(8, 'The minimum length is 8 characters').required(),
    }),
    onSubmit: (values) => {
      dispatch(email(values.email));
      dispatch(password(values.password));
      formik.handleReset(values)
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit }>
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
          Password
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
}

export default signIn;