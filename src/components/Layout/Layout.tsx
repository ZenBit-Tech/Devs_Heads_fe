import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { NavLink, Outlet } from 'react-router-dom';
import { RootState } from 'redux/store';
import {
	Nav,
	Ul,
	Li,
	Navigation,
	ButtonText,
	Border,
	UlNav,
	BoderNav,
	Image,
} from './Layout.styles';
import { t } from 'i18next';
import { saveEmail, saveToken, saveUserId } from 'redux/reducers/userSlice';
import {
	CreateJobPost,
	Home,
	PostJobPage,
	Settings,
	SignIn,
	SignUp,
	SettingsJobOwner,
	Contracts,
	Chat,
	TalentPage,
} from 'constants/routes';
import SettingPerson from '../../image/setting-person.svg';

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
					<Navigation>
						{user.role === Role.Client && (
							<>
								{(toggleMenu || screenWidth > 650) && (
									<UlNav>
										<Border className="dropdown">
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
										</Border>
										<Border>
											<NavLink to={`${TalentPage}`}>{`${t('ClientPage.talent')}`}</NavLink>
										</Border>
										<Border>
											<NavLink to={`${Chat}`}>{`${t('ClientPage.chat')}`}</NavLink>
										</Border>
										<Border>
											<NavLink to={`${Contracts}`}>{`${t('ClientPage.contracts')}`}</NavLink>
										</Border>
										<Border>
											<NavLink onClick={() => handleClick()} to={`${SignIn}`}>
												{`${t('ClientPage.logout')}`}
											</NavLink>
										</Border>
										<NavLink to={`${SettingsJobOwner}`}>
											<Image src={SettingPerson} alt="SettingPerson" />
										</NavLink>
									</UlNav>
								)}
								<ButtonText onClick={toggleNav} className="btn">
									Navigation Menu
								</ButtonText>
							</>
						)}
						<Ul>
							{user.role === Role.Freelancer && (
								<>
									<Li>
										<NavLink to={`${Home}`}>{`${t('Layout.home')}`}</NavLink>
									</Li>
									<Li>
										<NavLink to={`${PostJobPage}`}>{`${t('Layout.freelancerTitle')}`}</NavLink>
									</Li>
									<Li>
										<NavLink to={`${Settings}`}>{`${t('Layout.settings')}`}</NavLink>
									</Li>
									<Li>
										<NavLink onClick={() => handleClick()} to={`${SignIn}`}>
											{`${t('Layout.logout')}`}
										</NavLink>
									</Li>
								</>
							)}
						</Ul>
					</Navigation>
					<Outlet />
				</>
			) : (
				<>
					<Nav>
						<Ul>
							<Li>
								<NavLink to={`${Home}`}>{`${t('Layout.home')}`}</NavLink>
							</Li>
							<Li>
								<NavLink to={`${SignUp}`}>{`${t('Layout.signup')}`}</NavLink>
							</Li>
							<Li>
								<NavLink to={`${SignIn}`}>{`${t('Layout.login')}`}</NavLink>
							</Li>
						</Ul>
					</Nav>
					<Outlet />
				</>
			)}
		</div>
	);
};

export default Layout;
