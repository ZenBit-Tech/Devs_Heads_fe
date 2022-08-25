import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ token }: { token: string | null }) => {
	return token ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
