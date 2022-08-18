import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
<<<<<<< HEAD

const Container = styled.div`
	margin: 0 auto;
	max-width: 1000px;
`;

const Link = styled(NavLink)`
	font-size: 24px;
	margin-right: 5px;
	text-decoration: none;
	padding: 0 5px;
	color: ${BLACK_COLOR};

	&.active {
		border-width: 1px 1px 0 1px;
		border-color: ${BLACK_COLOR};
		border-style: solid;
	}
`;
=======
import { Container, Link } from './SettingsPage.styles';
>>>>>>> 8c7527e53baccd1309773542f31db46be95a9482

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
