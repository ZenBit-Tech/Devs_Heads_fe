import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const SamplePage = lazy(
  () => import("./pages/SamplePage" /* webpackChunkName: "sample-page" */)
);

const SignIn = lazy(
  () => import("pages/SigninPage")
);

const ForgotPassword = lazy(
  () => import("components/forgotPassword/forgotPassword")
);

const App: FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-passowrd" element={<ForgotPassword />} />
            <Route path="sample" element={<SamplePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
