import React from 'react';
import styled from 'styled-components';
import { BLACK_COLOR, GREEN_COLOR, WHITE_COLOR } from 'constants/colors';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { phoneNumberRegExp } from 'constants/reg-exps';

const Container = styled.div`
  border: 1px solid ${BLACK_COLOR};
  padding: 5px;
`;

const InputBlock = styled.div`
  width: 600px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledInput = styled.input`
  width: 400px;
  border-radius: 5px;
`;

const StyledLabel = styled.label`
  font-size: 24px;
`;

const SaveButton = styled.button`
  display: block;
  font-size: 24px;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background-color: ${GREEN_COLOR};
  color: ${WHITE_COLOR};
  border-color: ${WHITE_COLOR};
  margin: 0 auto;
`;

const Form = styled.form`
  width: border-box;
`;

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
