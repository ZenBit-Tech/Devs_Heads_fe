import React, { FC } from 'react';
import { Div1, H1, P, Div2, Div3, Button, Button2 } from './Registration.styles';
import { GREEN, WHITE } from 'constants/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const RegistrationPage: FC = () => {
	const [toogle, setToogle] = React.useState(true);
	const [green, setGreen] = React.useState('');
	const [white, setWhite] = React.useState('');
	const { t } = useTranslation();
	const navigate = useNavigate();

	const changeColor = () => {
		setToogle(state => !state);
		setGreen(() => (toogle ? GREEN : ''));
		setWhite(() => (toogle ? WHITE : ''));
	};

	const handleClick = () => {
		!toogle ? navigate('/welcome') : null;
	};

	return (
		<Div1>
			<H1>{`${t('Registration.title')}`}</H1>
			<P>{`${t('Registration.selectRole')}`}</P>
			<Div2>
				<P>{`${t('Registration.text')}`}</P>
				<Div3>
					<Button style={{ background: green, color: white }} onClick={() => changeColor()}>
						{`${t('Registration.buttonText1')}`}
					</Button>
					<Button>{`${t('Registration.buttonText2')}`}</Button>
				</Div3>
				<Button2 onClick={() => handleClick()}>{`${t('Registration.buttonAccount')}`}</Button2>
			</Div2>
		</Div1>
	);
};

export default RegistrationPage;
