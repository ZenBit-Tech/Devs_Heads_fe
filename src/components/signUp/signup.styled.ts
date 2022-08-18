import image from 'image/google.jpg';
import styled from 'styled-components';
import { GREY, BLUE, WHITE, FONT_SMALL, FONT_LARGE } from 'constants/styles';

export const Div = styled.div`
	border: solid 1px ${GREY};
	margin-left: 400px;
	width: 400px;
`;

export const Button = styled.button`
	text-align: right;
	background: ${BLUE};
	background-image: url(${image});
	background-repeat: no-repeat;
	background-size: 40px;
	border: 2px ${BLUE};
	border-radius: 6px;
	color: ${WHITE};
	margin-left: 40px;
	padding: 8px;
	padding-right: 20px;
	height: 40px;
	width: 200px;
`;

export const P = styled.p`
	color: ${GREY};
	font-size: ${FONT_SMALL};
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
	border-radius: 6px;
	border: solid 1px ${GREY};
	height: 30px;
	width: 300px;
`;
