import React, { FC } from 'react';
import { Div1, H1, P, Div2, Div3, Button, Button2 } from './Registration.styles';
import { useTranslation } from 'react-i18next';

const RegistrationPage: FC = () => {
	const { t } = useTranslation();
	return (
		<Div1>
			<H1>{`${t('Registration.title')}`}</H1>
			<P>{`${t('Registration.selectRole')}`}</P>
			<Div2>
				<P>{`${t('Registration.text')}`}</P>
				<Div3>
					<Button>{`${t('Registration.buttonText1')}`}</Button>
					<Button>{`${t('Registration.buttonText2')}`}</Button>
				</Div3>
				<Button2>{`${t('Registration.buttonAccount')}`}</Button2>
			</Div2>
		</Div1>
	);
};

export default RegistrationPage;
