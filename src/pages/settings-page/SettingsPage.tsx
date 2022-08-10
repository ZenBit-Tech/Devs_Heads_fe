import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

const Link = styled(NavLink)`
  font-size: 24px;
  margin-right: 5px;
  text-decoration: none;
  padding: 0 5px;
  color: black;
  &.active {
    border-width: 1px 1px 0 1px;
    border-color: black;
    border-style: solid;
  }
`;

export const SettingsPage = () => {
  return (
    <Container>
      <div>
        <Link to="edit-profile">Profile (Edit)</Link>
        <Link to="contact-info">Contact Info</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </Container>
  );
};
