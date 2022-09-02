import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { WelcomePageLayoutWrapper, TitleStyled, ImageStyled } from './WelcomePageLayout.styles';
import ArrowDowm from 'assets/arrowDown.jpg';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

const WelcomePageLayout: FC = () => {
	const role = useSelector((state: RootState) => state.user.role);
	console.log(role);
	const { t } = useTranslation();

	const Role = {
		Freelancer: 'freelancer',
		Client: 'client',
	};

	return (
		<WelcomePageLayoutWrapper>
			<TitleStyled>{`${t('WelcomePage.title')}`}</TitleStyled>
			<p>{`${t('WelcomePage.description')}`}</p>
			<p>{`${t('WelcomePage.pointerToLink')}`}</p>
			<ImageStyled src={ArrowDowm} alt="arrowDown" />
			{role === Role.Freelancer ? (
				<Link to="/settings">{`${t('WelcomePage.linkDescription')}`}</Link>
			) : (
				<Link to="/post-job">{`${t('WelcomePage.linkDescription')}`}</Link>
			)}
		</WelcomePageLayoutWrapper>
	);
};

export default WelcomePageLayout;
