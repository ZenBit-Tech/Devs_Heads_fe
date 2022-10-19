import { FC, useEffect } from 'react';
import { Div1, H1, P, Div2, Div3, Button2 } from './RoleSelection.styles';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Radio, RadioChangeEvent } from 'antd';
import { RootState } from 'redux/store';
import { saveEmail, saveRole, saveUserId } from 'redux/reducers/userSlice';
import { useAppDispatch } from 'redux/hooks';
import { useSignUpUpdateMutation } from 'service/httpService';
import { Welcome } from 'constants/routes';

export const Role = {
	Freelancer: 'freelancer',
	Client: 'client',
};

const RoleSelection: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [signUpUpdate] = useSignUpUpdateMutation();
	const user = useSelector((state: RootState) => state.user);
	const params = useParams();

	useEffect(() => {
		if (params.user) {
			dispatch(saveEmail(String(params.user)));
		}
	}, []);

	const handleChange = (event: RadioChangeEvent) => {
		dispatch(saveRole(event.target.value));
	};
	const handleClick = async () => {
		try {
			const res = await signUpUpdate({
				email: user.email ?? String(params.user),
				role: user.role,
			}).unwrap();
			dispatch(saveUserId(res.id));
			navigate(`${Welcome}`);
		} catch (e) {
			console.log(e);
			alert('error');
		}
	};

	return (
		<Div1>
			<H1>{`${t('Registration.title')}`}</H1>
			<P>{`${t('Registration.selectRole')}`}</P>
			<Div2>
				<P>{`${t('Registration.text')}`}</P>
				<Div3>
					<Radio.Group buttonStyle="solid" onChange={handleChange} value={user.role}>
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
