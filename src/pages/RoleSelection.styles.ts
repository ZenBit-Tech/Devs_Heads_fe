import styled from 'styled-components';
<<<<<<< HEAD
import { FONT_MEDIUM, FONT_LARGE } from 'constants/fonts';
import { BLUE, LIGHT_GREY, GREY, WHITE } from 'constants/colors';
=======
import { BLUE, LIGHT_GREY, GREY, WHITE } from 'constants/styles';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9

export const Div1 = styled.div`
	align-content: center;
	display: flex;
	flex-flow: column wrap;
`;
export const H1 = styled.label`
	text-align: center;
<<<<<<< HEAD
	margin-top: 30px;
=======
	font-size: ${LARGE_FONT_SIZE};
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9
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
<<<<<<< HEAD
	font-size: ${FONT_MEDIUM};
=======
	font-size: ${MEDIUM_FONT_SIZE};
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9
	color: ${GREY};
	margin-bottom: 30px;
	margin-top: 30px;
`;

<<<<<<< HEAD
export const LabelStyled = styled.label`
	border: 1px solid ${GREY};
	border-radius: 6px;
	font-size: ${FONT_MEDIUM};
	margin-top: 20px;
	padding: 30px;
	width: 235px;
`;

=======
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9
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
