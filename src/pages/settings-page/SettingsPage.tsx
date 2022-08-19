import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Link } from './SettingsPage.styles';

export const SettingsPage = () => {
	const { t } = useTranslation();

	return (
		<Container>
			<div>
				<Link to="edit-profile">{`${t('SettingsPage.profileEdit')}`}</Link>
				<Link to="contact-info">{`${t('SettingsPage.contactInfo')}`}</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</Container>
	);
};
