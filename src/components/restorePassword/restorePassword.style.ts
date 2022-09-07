import styled from 'styled-components';
<<<<<<< HEAD
import { SMALL_FONT_SIZE, FONT_LARGE } from 'constants/fonts';
import { BLUE, GREY, RED_COLOR, WHITE } from 'constants/colors';
=======
import { BLUE, GREY, DARK_GREY, WHITE } from 'constants/styles';
import { RED_COLOR } from 'constants/colors';
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9

export const Div = styled.div`
	margin: auto;
	width: 50%;
	@media screen and (max-width: 600px) {
		width: 90%;
	}
`;

export const H1 = styled.h2`
	text-align: center;
`;

export const ErrorP = styled.p`
<<<<<<< HEAD
	margin-left: 60px;
	color: ${RED_COLOR};
	font-size: ${SMALL_FONT_SIZE};
`;

export const Form = styled.form`
	border: solid 1px ${GREY};
	margin-top: 80px;
	margin-left: 150px;
	height: 380px;
	width: 400px;
=======
	color: ${RED_COLOR};
	font-size: 1vw;
`;

export const Form = styled.form`
	align-content: center;
	border: solid 1px ${GREY};
	border-radius: 10px;
	display: flex;
	flex-flow: column wrap;
	margin: auto;
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9
`;

export const Input = styled.input`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	border-radius: 6px;
	border: solid 1px ${GREY};
	height: 35px;
	width: 80%;
`;

export const ControlStyle = styled.label`
	color: ${GREY};
	display: flex;
	flex-flow: column wrap;
	margin-left: 1%;
`;

export const Button = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: 1.5vw;
	margin: auto;
	margin-top: 2%;
	margin-bottom: 2%;
	height: 50px;
	width: 50%;
`;
