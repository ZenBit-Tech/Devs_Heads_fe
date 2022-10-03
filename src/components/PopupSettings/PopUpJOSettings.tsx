import React from 'react';
import profileImage from 'image/profile.png';
import { NavLink } from 'react-router-dom';
import { SettingsJobOwner, SignIn, Settings } from 'constants/routes';
import { t } from 'i18next';
import { Div, Img, BoderNav, Icon } from 'components/PopupSettings/PopupJO.styles';
import settingsIcon from 'assets/settings.png';
import logout from 'assets/logout.png';

interface IProps {
	handleClick: () => void;
	role: string;
}
const Role = {
	Freelancer: 'freelancer',
	Client: 'client',
};

const JOPopupSettings = (props: IProps) => {
	const { handleClick, role } = props;
	return (
		<Div>
			<Img src={profileImage} />
			<BoderNav>
				<NavLink
					style={{ color: 'black' }}
					to={role === Role.Client ? `${SettingsJobOwner}` : `${Settings}`}
				>
					<Icon>
						<img style={{ marginRight: 5 }} src={settingsIcon} />
						{`${t('ClientPage.settings')}`}
					</Icon>
				</NavLink>
			</BoderNav>
			<BoderNav>
				<NavLink style={{ color: 'black' }} onClick={handleClick} to={`${SignIn}`}>
					<Icon>
						<img style={{ marginRight: 5 }} src={logout} />
						{`${t('ClientPage.logout')}`}
					</Icon>
				</NavLink>
			</BoderNav>
		</Div>
	);
};

export default JOPopupSettings;
