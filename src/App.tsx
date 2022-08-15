import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoutes from './hoc/PrivateRoutes';
import GoogleAuth from './components/GoogleAuth/GoogleAuth';

const SamplePage = lazy(() => import('./pages/SamplePage' /* webpackChunkName: "sample-page" */));

const Cookies = require('js-cookie');

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
              <Route path="sample" element={<SamplePage />} />
            </Route>
            {/*here public routes */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="*" element={<GoogleAuth />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
