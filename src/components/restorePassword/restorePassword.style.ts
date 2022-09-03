import styled from 'styled-components';
import { SMALL_FONT_SIZE, FONT_LARGE } from 'constants/fonts';
import { BLUE, GREY, RED_COLOR, WHITE } from 'constants/colors';

export const Div = styled.div`
	margin-left: 300px;
	width: 500px;
`;

export const ErrorP = styled.p`
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
`;

export const Input = styled.input`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	border-radius: 6px;
	border: solid 1px ${GREY};
	height: 30px;
	margin-left: 50px;
	width: 300px;
`;

export const ControlStyle = styled.label`
	color: ${GREY};
	display: flex;
	flex-flow: column wrap;
	margin-top: 40px;
	margin-left: 50px;
`;

export const Button = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${FONT_LARGE};
	height: 40px;
	margin-left: 120px;
	margin-top: 50px;
	margin-bottom: 20px;
	height: 50px;
	width: 150px;
`;
