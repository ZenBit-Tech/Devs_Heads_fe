import React, { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import SignInPage from '../../pages/Home';

const Layout: FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">home</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="/sample">sample</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
      <SignInPage />
    </div>
  );
};

export default Layout;
