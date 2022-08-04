import React, { FC, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";

const SamplePage = lazy(
  () => import("../pages/SamplePage" /* webpackChunkName: "sample-page" */)
);

const App: FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="sample" element={<SamplePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
