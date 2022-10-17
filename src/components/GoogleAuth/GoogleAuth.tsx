import React from 'react';
import googleIcon from 'assets/googleIcon.png';
import { Image, Typography, Container } from 'components/GoogleAuth/GoogleAuthStyle';
import { useTranslation } from 'react-i18next';

const REACT_APP_GOOGLE_REDIRECT = 'http://localhost:3000/auth/redirect';

function GoogleAuth() {
	const { t } = useTranslation();
	const googleAuth = () => {
		window.open(`${REACT_APP_GOOGLE_REDIRECT}`, '_self');
	};
	return (
		<Container onClick={googleAuth}>
			<Image src={googleIcon} />
			<Typography>{`${t('GoogleAuthButton.googleAuth')}`}</Typography>
		</Container>
	);
}

export default GoogleAuth;
