import styled from 'styled-components';
import { SMALL_FONT_SIZE, FONT_LARGE } from 'constants/fonts';
import { GREY, BLUE, WHITE, RED_COLOR } from 'constants/colors';

export const Div = styled.div`
	border: solid 1px ${GREY};
	margin-top: 80px;
	margin-left: 450px;
	width: 400px;
`;

export const ErrorP = styled.p`
	color: ${RED_COLOR};
	font-size: ${SMALL_FONT_SIZE};
	text-align: center;
	margin-top: 5px;
	margin-bottom: 3px;
`;

export const P = styled.p`
	color: ${GREY};
	font-size: ${SMALL_FONT_SIZE};
	text-align: center;
	margin-top: 5px;
	margin-bottom: 3px;
`;

export const Register = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${FONT_LARGE};
	height: 40px;
	margin-left: 50px;
	margin-top: 20px;
	margin-bottom: 10px;
	width: 200px;
`;

export const Form = styled.form`
	align-content: center;
	display: flex;
	flex-flow: column wrap;
`;

export const ControlStyle = styled.label`
	color: ${GREY};
	display: flex;
	flex-flow: column wrap;
	margin-top: 10px;
`;

export const Input = styled.input`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	border-radius: 6px;
	border: solid 1px ${GREY};
	height: 30px;
	width: 300px;
`;
