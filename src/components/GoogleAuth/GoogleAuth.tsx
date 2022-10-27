import React from 'react';
import googleIcon from 'assets/googleIcon.png';
import { Image, Typography, Container } from 'components/GoogleAuth/GoogleAuthStyle';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SignUp } from 'constants/routes';

function GoogleAuth() {
	const { t } = useTranslation();
	const location = useLocation();
	const googleAuth = () => {
		location.pathname === SignUp
			? window.open(`${process.env.REACT_APP_GOOGLE_REDIRECT}`, '_self')
			: window.open(`${process.env.REACT_APP_GOOGLE_SIGNIN}`, '_self');
	};
	return (
		<Container onClick={googleAuth}>
			<Image src={googleIcon} />
			<Typography>
				{location.pathname === SignUp
					? `${t('GoogleAuthButton.googleAuth')}`
					: `${t('GoogleAuthButton.googleSignin')}`}
			</Typography>
		</Container>
	);
}

export default GoogleAuth;
