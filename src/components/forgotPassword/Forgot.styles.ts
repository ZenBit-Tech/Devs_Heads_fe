import styled from 'styled-components';
<<<<<<< HEAD
import { MEDIUM_FONT_SIZE, LARGE_FONT_SIZE } from 'constants/fonts';
import { BLUE, GREY, DARK_GREY, WHITE } from 'constants/colors';

export const Div = styled.div`
	margin-top: 80px;
	margin-left: 400px;
	width: 600px;
`;

export const Message = styled.div`
	text-align: center;
	border: solid 1px ${GREY};
	color: ${DARK_GREY};
	font-size: ${MEDIUM_FONT_SIZE};
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	margin-top: 50px;
	margin-left: 50px;
	height: 100px;
	width: 500px;
`;

export const H4 = styled.h4`
	text-align: center;
	font-size: ${LARGE_FONT_SIZE};
	color: ${DARK_GREY};
=======
import { BLUE, GREY, DARK_GREY, WHITE } from 'constants/styles';
import { RED_COLOR } from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';

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
	color: ${RED_COLOR};
	font-size: ${MEDIUM_FONT_SIZE};
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9
`;

export const Form = styled.form`
	align-content: center;
	border: solid 1px ${GREY};
	border-radius: 10px;
	display: flex;
<<<<<<< HEAD
	flex-flow: row wrap;
	justify-content: space-around;
	margin-top: 30px;
	margin-left: 50px;
	height: 200px;
	width: 500px;
=======
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
<<<<<<< HEAD
	margin-top: 30px;
	margin-left: 25px;
	height: 35px;
	width: 350px;
=======
	height: 35px;
	width: 80%;
`;

export const ControlStyle = styled.label`
	color: ${DARK_GREY};
	display: flex;
	flex-flow: column wrap;
	margin-left: 1%;
	font-size: ${MEDIUM_FONT_SIZE};
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9
`;

export const Button = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${MEDIUM_FONT_SIZE};
<<<<<<< HEAD
	height: 40px;
	margin-top: 40px;
	margin-bottom: 10px;
	height: 40px;
	width: 150px;
=======
	margin: auto;
	margin-top: 2%;
	margin-bottom: 2%;
	height: 50px;
	width: 50%;
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 3%;
>>>>>>> d792929983f74b16d4beebcb95791a88883b87e9
`;
