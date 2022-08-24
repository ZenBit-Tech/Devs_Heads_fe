import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import PrivateRoutes from './hoc/PrivateRoutes';
import { SettingsPage } from './pages/settings-page/SettingsPage';
import { ProfileEdit } from './pages/settings-page/components/ProfileEdit/ProfileEdit';
import { ContactInfo } from './pages/settings-page/components/ContactInfo/ContactInfo';
import './App.css';

const WelcomePage = lazy(
	() => import('./pages/WelcomePage/WelcomePage' /* webpackChunkName: "welcome-page" */),
);

const SignUp = lazy(() => import('pages/Signup'));

const Cookies = require('js-cookie');

const RoleSelection = lazy(() => import('./pages/RoleSelection'));

const SignIn = lazy(() => import('pages/SigninPage'));

const ForgotPassword = lazy(() => import('components/forgotPassword/forgotPassword'));

const ResetPassword = lazy(() => import('components/restorePassword/restorePassword'));

const App: FC = () => {
	Cookies.set('name', 'value');
	const a = Cookies.get('accessToken'); // TODO delete mock token when sign up/sign in will be completed
	console.log(Cookies.get('key'));
	const token: string | null = localStorage.getItem('token');
	console.log(a);

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Layout />}>
						{/*here public routes */}
						<Route path={'/restore-password'} element={<ResetPassword />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/role-selection" element={<RoleSelection />} />
						<Route path="/welcome" element={<WelcomePage />} />
						<Route path="settings/" element={<SettingsPage />}>
							<Route path="edit-profile" element={<ProfileEdit />} />
							<Route path="contact-info" element={<ContactInfo />} />
						</Route>
						<Route path="*" element={<Navigate to="/" />} />
					</Route>
					<Route element={<PrivateRoutes token={token} />}>
						{/*here insert your private routes */}
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
