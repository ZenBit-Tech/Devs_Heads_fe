import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import PrivateRoutes from './hoc/PrivateRoutes';
import GoogleAuth from './components/GoogleAuth/GoogleAuth';
import { SettingsPage } from './pages/settings-page/SettingsPage';
import { ProfileEdit } from './pages/settings-page/components/ProfileEdit/ProfileEdit';
import { ContactInfo } from './pages/settings-page/components/ContactInfo/ContactInfo';
import './App.css';

const SamplePage = lazy(() => import('pages/SamplePage' /* webpackChunkName: "sample-page" */));
const WelcomePage = lazy(
	() => import('./pages/WelcomePage/WelcomePage' /* webpackChunkName: "welcome-page" */),
);

const SignUp = lazy(() => import('pages/Signup'));

const Cookies = require('js-cookie');

const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));

const SignIn = lazy(() => import('pages/SigninPage'));

const ForgotPassword = lazy(() => import('components/forgotPassword/forgotPassword'));

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
						<Route element={<PrivateRoutes token={token} />}>
							{/*here insert your private routes */}
							<Route path="welcome" element={<WelcomePage />} />
						</Route>
						{/*here public routes */}
						<Route path="sample" element={<SamplePage />} />
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/forgot-passowrd" element={<ForgotPassword />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/registration" element={<RegistrationPage />} />
						<Route path="*" element={<Navigate to="/" />} />
						<Route path="*" element={<GoogleAuth />} />
						<Route path="settings/" element={<SettingsPage />}>
							<Route path="edit-profile" element={<ProfileEdit />} />
							<Route path="contact-info" element={<ContactInfo />} />
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
