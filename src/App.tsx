import React, { FC, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";

const SamplePage = lazy(
  () => import("./pages/SamplePage" /* webpackChunkName: "sample-page" */)
);

const SignUp = lazy(
  () => import("./pages/Signup")
);

const App: FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="sample" element={<SamplePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
