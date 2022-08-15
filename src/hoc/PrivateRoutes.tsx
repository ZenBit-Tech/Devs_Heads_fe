import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ token }: { token: string | null }) => {
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
