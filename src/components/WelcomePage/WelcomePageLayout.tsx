import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WelcomePageLayoutWrapper, TitleStyled, ImageStyled } from './WelcomePageLayout.styles';
import ArrowDowm from 'assets/arrowDown.jpg';

const WelcomePageLayout: FC = () => {
	const { t } = useTranslation();

	return (
		<WelcomePageLayoutWrapper>
			<TitleStyled>{`${t('WelcomePage.title')}`}</TitleStyled>
			<p>{`${t('WelcomePage.description')}`}</p>
			<p>{`${t('WelcomePage.pointerToLink')}`}</p>
			<ImageStyled src={ArrowDowm} alt="arrowDown" />
			<Link to="/settings">{`${t('WelcomePage.linkDescription')}`}</Link>
		</WelcomePageLayoutWrapper>
	);
};

export default WelcomePageLayout;
