import styled from 'styled-components';
import { BLUE, LIGHT_GREY, GREY, DARK_GREY, WHITE, FONT_SMALL, FONT_LARGE } from 'constants/styles';

export const Div = styled.div`
	margin-left: 300px;
	width: 500px;
`;

export const ErrorP = styled.p`
margin-left: 60px;
color: ${DARK_GREY}
font-size: ${FONT_SMALL}
`;

export const Form = styled.form`
	background: ${LIGHT_GREY};
	border: solid 1px ${GREY};
	margin-top: 20px;
	margin-left: 100px;
	height: 350px;
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
	color: ${DARK_GREY};
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
