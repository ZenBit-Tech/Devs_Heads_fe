import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Div, Form, Input, Button, ControlStyle, ErrorP } from './Forgot.styles';
import { useTranslation } from 'react-i18next';

type FormData = {
  email: string;
}

const schema = Yup.object({
  email: Yup.string().email().required(),
}).required();

const forgotPassword = () => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<FormData> = (values: object) => {
    console.log(values);

    reset({ email: '' });
  };

  return (
    <Div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ControlStyle>{`${t('ForgotPassword.email')}`}</ControlStyle>
          <Controller
            render={({ field }) => <Input type="text" {...field} />}
            name="email"
            control={control}
            defaultValue="" 
          />
          <ErrorP>{errors.email?.message}</ErrorP>
        <Button type="submit">{`${t('ForgotPassword.sendButton')}`}</Button>
      </Form>
    </Div>
  );
}

export default forgotPassword;