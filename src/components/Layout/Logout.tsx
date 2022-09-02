import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { saveUserId, saveEmail } from 'redux/reducers/userSlice';
import { Image } from './Layout.styles';
import Logout from 'assets/logout.png';

const LogOut: FC = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(saveEmail(''));
		dispatch(saveUserId(0));
		localStorage.clear();
	};

	return (
		<>
			<NavLink onClick={() => handleClick()} to="/sign-in">
				<Image src={Logout} />
			</NavLink>
		</>
	);
};

export default LogOut;
