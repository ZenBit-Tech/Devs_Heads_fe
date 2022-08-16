import React from 'react';
import styled from 'styled-components';
import { BLACK_COLOR } from 'constants/colors';

const Container = styled.div`
	border: 1px solid ${BLACK_COLOR};
	padding: 5px;
`;

export const ContactInfo = () => {
	return <Container>Contact Info</Container>;
};
