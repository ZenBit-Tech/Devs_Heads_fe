import styled from 'styled-components';
import { BLUE, LIGHT_GREY, GREY, WHITE } from 'constants/styles';

export const Div1 = styled.div`
	align-content: center;
	display: flex;
	flex-flow: column wrap;
`;
export const H1 = styled.label`
	text-align: center;
	font-size: 2.5vw;
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
	font-size: 2vw;
`;

export const P = styled.p`
	text-align: center;
	font-size: 1.8vw;
	color: ${GREY};
	margin-bottom: 30px;
	margin-top: 30px;
`;

export const Button2 = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: 2vw;
	height: 5%;
	margin: auto;
	margin-bottom: 2%;
	width: 60%;
`;
