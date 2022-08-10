import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { SettingsPage } from './pages/settings-page/SettingsPage';
import { ProfileEdit } from './pages/settings-page/components/ProfileEdit/ProfileEdit';
import { ContactInfo } from './pages/settings-page/components/ContactInfo/ContactInfo';
import './App.css';

const SamplePage = lazy(() => import('./pages/SamplePage' /* webpackChunkName: "sample-page" */));

const App: FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="sample" element={<SamplePage />} />
            <Route path="*" element={<Navigate to="/" />} />
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
