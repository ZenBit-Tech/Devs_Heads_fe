import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { NavLink, Outlet } from 'react-router-dom';
import { RootState } from 'redux/store';
import { Navigation, ButtonText, Li, UlNav, BoderNav, Image } from './Layout.styles';
import { t } from 'i18next';
import { saveEmail, saveToken, saveUserId } from 'redux/reducers/userSlice';
import {
	CreateJobPost,
	PostJobPage,
	Settings,
	SignIn,
	Contracts,
	Chat,
	TalentPage,
	SettingsJobOwner,
	Home,
	SignUp,
} from 'constants/routes';
import SettingPerson from 'image/setting-person.svg';
import Person from 'image/profile.png';

const Layout: FC = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const dispatch = useAppDispatch();
	const [toggleMenu, setToggleMenu] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const toggleNav = () => {
		setToggleMenu(!toggleMenu);
	};

	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener('resize', changeWidth);

		return () => {
			window.removeEventListener('resize', changeWidth);
		};
	}, []);

	const handleClick = () => {
		dispatch(saveEmail(''));
		dispatch(saveToken(''));
		dispatch(saveUserId(0));
		localStorage.clear();
	};

	const Role = {
		Freelancer: 'freelancer',
		Client: 'client',
	};

	return (
		<div>
			{user.id && user ? (
				<>
					{user.role === Role.Client && (
						<>
							{(toggleMenu || screenWidth > 650) && (
								<Navigation>
									<UlNav>
										<Li className="dropdown">
											<button
												className="dropdownButton dropdown-toggle"
												type="button"
												id="dropdownMenuButton"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												{`${t('ClientPage.clientTitleDrop')}`}
											</button>
											<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
												<BoderNav>
													<NavLink className="dropdown-item" to={`${PostJobPage}`}>{`${t(
														'ClientPage.clientTitle',
													)}`}</NavLink>
												</BoderNav>
												<BoderNav>
													<NavLink className="dropdown-item" to={`${CreateJobPost}`}>{`${t(
														'ClientPage.create',
													)}`}</NavLink>
												</BoderNav>
											</div>
										</Li>
										<Li>
											<NavLink to={`${TalentPage}`}>{`${t('ClientPage.talent')}`}</NavLink>
										</Li>
										<Li>
											<NavLink to={`${Chat}`}>{`${t('ClientPage.chat')}`}</NavLink>
										</Li>
										<Li>
											<NavLink to={`${Contracts}`}>{`${t('ClientPage.contracts')}`}</NavLink>
										</Li>
										<NavLink to={`${SettingsJobOwner}`}>
											<Image src={SettingPerson} alt="SettingPerson" />
										</NavLink>
										<Li>
											<NavLink onClick={handleClick} to={`${SignIn}`}>
												{`${t('ClientPage.logout')}`}
											</NavLink>
										</Li>
									</UlNav>
								</Navigation>
							)}
							<ButtonText onClick={toggleNav} className="btn">
								{`${t('ClientPage.menu')}`}
							</ButtonText>
						</>
					)}
					{user.role === Role.Freelancer && (
						<>
							{(toggleMenu || screenWidth > 650) && (
								<Navigation>
									<UlNav>
										<>
											<Li>
												<NavLink to={`${Contracts}`}>{`${t(
													'FreelancerLayout.contracts',
												)}`}</NavLink>
											</Li>
											<Li>
												<NavLink to={`${Chat}`}>{`${t('FreelancerLayout.chat')}`}</NavLink>
											</Li>
											<Li>
												<NavLink to={`${PostJobPage}`}>{`${t('FreelancerLayout.search')}`}</NavLink>
											</Li>
											<NavLink to={`${Settings}`}>
												<Image src={Person} alt="SettingPerson" />
											</NavLink>
											<Li>
												<NavLink onClick={handleClick} to={`${SignIn}`}>
													{`${t('Layout.logout')}`}
												</NavLink>
											</Li>
										</>
									</UlNav>
								</Navigation>
							)}
							<ButtonText onClick={toggleNav} className="btn">
								{`${t('ClientPage.menu')}`}
							</ButtonText>
						</>
					)}
					<Outlet />
				</>
			) : (
				<>
					<Navigation>
						<UlNav>
							<Li>
								<NavLink to={`${Home}`}>{`${t('Layout.home')}`}</NavLink>
							</Li>
							<Li>
								<NavLink to={`${SignUp}`}>{`${t('Layout.signup')}`}</NavLink>
							</Li>
							<Li>
								<NavLink to={`${SignIn}`}>{`${t('Layout.login')}`}</NavLink>
							</Li>
						</UlNav>
					</Navigation>
					<Outlet />
				</>
			)}
		</div>
	);
};

export default Layout;
