import React from 'react';
import profileImage from 'image/profile.png';
import { NavLink } from 'react-router-dom';
import { SettingsJobOwner, SignIn } from 'constants/routes';
import { t } from 'i18next';
import { Div, Img, BoderNav, Icon } from 'components/PopupSettings/PopupJO.styles';
import settingsIcon from 'assets/settings.png';
import logout from 'assets/logout.png';

interface IProps {
	handleClick: () => void;
}

const JOPopupSettings = (props: IProps) => {
	const { handleClick } = props;
	return (
		<Div>
			<Img src={profileImage} />
			<BoderNav>
				<NavLink style={{ color: 'black' }} to={`${SettingsJobOwner}`}>
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
