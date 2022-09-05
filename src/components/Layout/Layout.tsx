import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { NavLink, Outlet } from 'react-router-dom';
import { RootState } from 'redux/store';
import { Nav, Ul, Li } from './Layout.styles';
import { t } from 'i18next';
import { saveEmail, saveToken, saveUserId } from 'redux/reducers/userSlice';

const Layout: FC = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const id = JSON.parse(localStorage.getItem('userId') as string);
	const role = JSON.parse(localStorage.getItem('role') as string);

	const dispatch = useAppDispatch();

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
			{id && user ? (
				<>
					<Nav>
						<Ul>
							<Li>
								<NavLink to="/">{`${t('Layout.home')}`}</NavLink>
							</Li>
							{role === Role.Client && (
								<>
									<Li>
										<NavLink to="post-job">{`${t('Layout.clientTitle')}`}</NavLink>
									</Li>
									<Li>
										<NavLink to="/create-job-post">{`${t('Layout.create')}`}</NavLink>
									</Li>
								</>
							)}
							{role === Role.Freelancer && (
								<>
									<Li>
										<NavLink to="post-job">{`${t('Layout.freelancerTitle')}`}</NavLink>
									</Li>
									<Li>
										<NavLink to="/settings/edit-profile">{`${t('Layout.settings')}`}</NavLink>
									</Li>
								</>
							)}
							<Li>
								<NavLink onClick={() => handleClick()} to="/sign-in">
									{`${t('Layout.logout')}`}
								</NavLink>
							</Li>
						</Ul>
					</Nav>
					<Outlet />
				</>
			) : (
				<>
					<Nav>
						<Ul>
							<Li>
								<NavLink to="/">{`${t('Layout.home')}`}</NavLink>
							</Li>
							<Li>
								<NavLink to="/sign-up">{`${t('Layout.signup')}`}</NavLink>
							</Li>
							<Li>
								<NavLink to="/sign-in">{`${t('Layout.login')}`}</NavLink>
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
