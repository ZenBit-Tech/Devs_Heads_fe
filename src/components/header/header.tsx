import React, { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Image, Nav, Ul, Li } from './header.style';
import Home from 'assets/home.png';
import Settings from 'assets/settings.png';
import LogOut from 'components/Layout/Logout';

const Header: FC = () => {
	return (
		<div>
			<Nav>
				<Ul>
					<Li>
						<NavLink to="/">
							<Image src={Home} />
						</NavLink>
					</Li>
					<Li>
						<NavLink to="post-job">MY JOBS</NavLink>
					</Li>
					<Li>
						<NavLink to="/create-job-post">CREATE JOB POST</NavLink>
					</Li>
					<Li>
						<NavLink to="/sign-up">SIGN UP</NavLink>
					</Li>
					<Li>
						<NavLink to="/settings">
							<Image src={Settings} />
						</NavLink>
					</Li>
					<Li>
						<LogOut />
					</Li>
				</Ul>
			</Nav>
			<Outlet />
		</div>
	);
};

export default Header;
