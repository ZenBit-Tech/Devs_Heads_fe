import styled from 'styled-components';
import { BLUE, LIGHT_BLUE, WHITE } from './colors';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
	margin-left: 30px;
	width: 220px;
	height: 50px;
	background: ${BLUE};
	padding: 2px;
	border-radius: 5px;

	&:hover {
		background: ${LIGHT_BLUE};
	}
`;
export const Image = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 5px;
`;
export const Typography = styled.div`
	color: ${WHITE};
	width: 70%;
	font-family: Roboto, sans-serif;
	margin: auto;
	font-weight: 400;
	font-size: 16px;
`;
