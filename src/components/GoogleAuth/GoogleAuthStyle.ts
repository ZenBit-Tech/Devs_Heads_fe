import { MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';
import { BLUE, LIGHT_BLUE, WHITE } from './colors';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	margin: auto;
	width: 40%;
	height: 50px;
	background: ${BLUE};
	padding: 2px;
	border-radius: 6px;

	&:hover {
		background: ${LIGHT_BLUE};
	}
`;
export const Image = styled.img`
	width: 45px;
	height: 45px;
	border-radius: 6px;
`;
export const Typography = styled.div`
	color: ${WHITE};
	width: 70%;
	font-family: Roboto, sans-serif;
	margin: auto;
	font-weight: 400;
	font-size: ${MEDIUM_FONT_SIZE};
`;
