import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoutes from './hoc/PrivateRoutes';

const SamplePage = lazy(() => import('./pages/SamplePage' /* webpackChunkName: "sample-page" */));

const App: FC = () => {
	localStorage.setItem('token', 'test'); // TODO delete mock token when sign up/sign in will be completed
	const token: string | null = localStorage.getItem('token');
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route element={<PrivateRoutes token={token} />}>
							{/*here insert your private routes */}
							<Route path="sample" element={<SamplePage />} />
						</Route>
						{/*here public routes */}
						<Route path="*" element={<Navigate to="/" />} />
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
