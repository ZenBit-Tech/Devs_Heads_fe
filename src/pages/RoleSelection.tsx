import React, { FC } from 'react';
import { Div1, H1, P, Div2, Div3, Button2 } from './RoleSelection.styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

const RoleSelection: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const role = useSelector((state: RootState) => state.user.role);

	const Role = {
		Freelancer: 'freelancer',
		Client: 'client',
	};

	const handleChange = (event: RadioChangeEvent) => {
		dispatch(setUser(event.target.value));
	};
	const handleClick = () => {
		navigate('/welcome');
	};

	return (
		<Div1>
			<H1>{`${t('Registration.title')}`}</H1>
			<P>{`${t('Registration.selectRole')}`}</P>
			<Div2>
				<P>{`${t('Registration.text')}`}</P>
				<Div3>
					<Radio.Group buttonStyle="solid" onChange={handleChange} value={role}>
						<Radio.Button value={Role.Freelancer}>{`${t(
							'Registration.buttonText1',
						)}`}</Radio.Button>
						<Radio.Button value={Role.Client}>{`${t('Registration.buttonText2')}`}</Radio.Button>
					</Radio.Group>
				</Div3>
				<Button2 onClick={() => handleClick()}>{`${t('Registration.buttonAccount')}`}</Button2>
			</Div2>
		</Div1>
	);
};

export default RoleSelection;
