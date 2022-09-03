import styled from 'styled-components';
import { RED_COLOR, BLUE, GREY, WHITE } from 'constants/colors';
import { SMALL_FONT_SIZE, FONT_MEDIUM } from 'constants/fonts';

export const Div = styled.div`
	margin-left: 400px;
	width: 500px;
`;

export const Div2 = styled.div`
	display: flex;
	text-align: center;
	justify-content: space-around;
	margin-top: 5px;
	margin-left: 30px;
	width: 350px;
`;

export const H1 = styled.h2`
	text-align: center;
`;

export const H2 = styled.h3`
	text-align: center;
`;

export const P = styled.p`
	color: ${GREY};
	font-size: ${SMALL_FONT_SIZE};
	font-weight: bold;
	margin-top: 2px;
	margin-left: 70px;
`;

export const ErrorP = styled.p`
	color: ${RED_COLOR};
	font-size: ${SMALL_FONT_SIZE};
`;

export const Form = styled.form`
	align-content: center;
	border: solid 1px ${GREY};
	display: flex;
	flex-flow: column wrap;
	margin-top: 20px;
	margin-left: 30px;
	height: 400px;
	width: 450px;
`;

export const Input = styled.input`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	border-radius: 6px;
	border: solid 1px ${GREY};
	height: 35px;
	width: 300px;
`;

export const ControlStyle = styled.label`
	color: ${GREY};
	display: flex;
	flex-flow: column wrap;
	margin-top: 30px;
`;

export const LinkStyle = styled.div`
	margin-top: 10px;
	margin-left: 150px;
`;

export const Button = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${FONT_MEDIUM};
	height: 40px;
	margin-left: 60px;
	margin-top: 60px;
	margin-bottom: 5px;
	height: 50px;
	width: 150px;
`;
