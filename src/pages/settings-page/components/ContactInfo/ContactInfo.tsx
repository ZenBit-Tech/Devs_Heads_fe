import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { phoneNumberRegExp } from 'constants/reg-exps';
import {
  Container,
  Form,
  StyledLabel,
  StyledInput,
  InputBlock,
  SaveButton,
} from './ContactInfo.styles';

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const phoneRegExp = new RegExp(phoneNumberRegExp);

export const ContactInfo = () => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data);
    reset();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputBlock>
          <StyledLabel>{`${t('ContactInfo.firstName')}`}</StyledLabel>
          <div>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: { value: true, message: `${t('ProfileEdit.fieldIsRequired')}` } }}
              render={({ field }) => <StyledInput {...field} />}
            />
            {errors.firstName && (
              <Alert message={errors.firstName.message} type="warning" showIcon />
            )}
          </div>
        </InputBlock>
        <InputBlock>
          <StyledLabel>{`${t('ContactInfo.lastName')}`}</StyledLabel>
          <div>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: { value: true, message: `${t('ProfileEdit.fieldIsRequired')}` } }}
              render={({ field }) => <StyledInput {...field} />}
            />
            {errors.lastName && <Alert message={errors.lastName.message} type="warning" showIcon />}
          </div>
        </InputBlock>
        <InputBlock>
          <StyledLabel>{`${t('ContactInfo.email')}`}</StyledLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <StyledInput {...field} />}
          />
        </InputBlock>
        <InputBlock>
          <StyledLabel>{`${t('ContactInfo.phone')}`}</StyledLabel>
          <div>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: `${t('ProfileEdit.fieldIsRequired')}` },
                pattern: {
                  value: phoneRegExp,
                  message: `${t('ContactInfo.wrongPhoneNumberPattern')}`,
                },
              }}
              render={({ field }) => <StyledInput {...field} />}
            />
            {errors.phoneNumber && (
              <Alert message={errors.phoneNumber.message} type="warning" showIcon />
            )}
          </div>
        </InputBlock>
        <SaveButton>{`${t('ProfileEdit.saveButton')}`}</SaveButton>
      </Form>
    </Container>
  );
};
