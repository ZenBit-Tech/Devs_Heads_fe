import React, { FC } from 'react';
import { useAppSelector } from 'redux/hooks';
import { NavLink, Outlet } from 'react-router-dom';
import { RootState } from 'redux/store';
import { Image, Nav, Ul, Li } from './Layout.styles';
import Header from '../header/header';
import Home from 'assets/home.png';

const Layout: FC = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const google = localStorage.getItem('google');

	return (
		<div>
			{!user.id && !google ? (
				<>
					<Nav>
						<Ul>
							<Li>
								<NavLink to="/">
									<Image src={Home} />
								</NavLink>
							</Li>
							<Li>
								<NavLink to="/sign-up">SIGN UP</NavLink>
							</Li>
							<Li>
								<NavLink to="/sign-in">LOGIN</NavLink>
							</Li>
						</Ul>
					</Nav>
					<Outlet />
				</>
			) : (
				<Header />
			)}
		</div>
	);
};

export default Layout;
