import styled from 'styled-components';
import { BLUE, LIGHT_GREY, GREY, WHITE } from 'constants/colors';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';

export const Div1 = styled.div`
	align-content: center;
	display: flex;
	flex-flow: column wrap;
`;
export const H1 = styled.label`
	text-align: center;
	font-size: ${LARGE_FONT_SIZE};
`;

export const Div2 = styled.div`
	display: flex;
	flex-flow: column wrap;
	border: solid 1px ${LIGHT_GREY};
	justify-content: space-around;
	width: 50%;
`;

export const Div3 = styled.div`
	display: flex;
	text-align: center;
	justify-content: space-around;
	margin-bottom: 50px;
	font-size: ${LARGE_FONT_SIZE};
`;

export const P = styled.p`
	text-align: center;
	font-size: ${MEDIUM_FONT_SIZE};
	color: ${GREY};
	margin-bottom: 30px;
	margin-top: 30px;
`;

export const Button2 = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${LARGE_FONT_SIZE};
	height: 5%;
	margin: auto;
	margin-bottom: 2%;
	width: 60%;
`;
