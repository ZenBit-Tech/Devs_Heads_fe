import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import PrivateRoutes from './hoc/PrivateRoutes';
import { SettingsPage } from './pages/settings-page/SettingsPage';
import { ProfileEdit } from './pages/settings-page/components/ProfileEdit/ProfileEdit';
import { ContactInfo } from './pages/settings-page/components/ContactInfo/ContactInfo';
import './App.css';
import GlobalStyle from 'config/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from 'config/theme';
import TalentPage from 'pages/TalentPage';
import SingleProfilePage from 'pages/SingleProfilePage';

const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));

const SignUp = lazy(() => import('pages/Signup'));

const Cookies = require('js-cookie');

const RoleSelection = lazy(() => import('./pages/RoleSelection'));

const SignIn = lazy(() => import('pages/SigninPage'));

const JobPostPage = lazy(() => import('pages/JobPostPage'));

const ForgotPassword = lazy(() => import('components/forgotPassword/forgotPassword'));

const RestorePassword = lazy(() => import('components/restorePassword/restorePassword'));
const PostJobPage = lazy(() => import('pages/PostJobPage'));
const JobDescriptionPage = lazy(() => import('pages/JobDescriptionPage'));
const JobDescriptionEditPage = lazy(() => import('pages/JobDescriptionEditPage'));
// const InviteTalent = lazy(() => import('pages/InviteTalentPage'));
const ClientSettings = lazy(() => import('pages/ClientSettingsPage'));

const Chat = lazy(() => import('components/chat/chat'));

const App: FC = () => {
	Cookies.set('name', 'value');
	const a = Cookies.get('accessToken'); // TODO delete mock token when sign up/sign in will be completed
	const token: string | null = localStorage.getItem('token');

	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/" element={<Layout />}>
							{/*here public routes */}
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path={'/restore-password/:token'} element={<RestorePassword />} />
							<Route path="/sign-in" element={<SignIn />} />
							<Route path="/sign-up" element={<SignUp />} />
							<Route path="/welcome" element={<WelcomePage />} />
							<Route path="/create-job-post" element={<JobPostPage />} />
							<Route path="/role-selection" element={<RoleSelection />} />
							<Route path="/role-selection/:user" element={<RoleSelection />} />
							<Route path="post-job/:id/edit" element={<JobDescriptionEditPage />} />
							<Route path="post-job/:id" element={<JobDescriptionPage />} />
							<Route path="post-job" element={<PostJobPage />} />
							<Route path="/talent" element={<TalentPage />} />
							<Route path="/chat" element={<Chat />} />
							<Route path="/client-settings" element={<ClientSettings />} />
							<Route path="profile/:id" element={<SingleProfilePage />} />
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
			</ThemeProvider>
		</>
	);
};

export default App;
