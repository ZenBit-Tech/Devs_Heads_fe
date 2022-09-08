import styled from 'styled-components';
import { BLUE, GREY, DARK_GREY, WHITE } from 'constants/colors';
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
`;

export const Form = styled.form`
	align-content: center;
	border: solid 1px ${GREY};
	border-radius: 10px;
	display: flex;
	flex-flow: column wrap;
	margin: auto;
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
	color: ${DARK_GREY};
	display: flex;
	flex-flow: column wrap;
	margin-left: 1%;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const Button = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${MEDIUM_FONT_SIZE};
	margin: auto;
	margin-top: 2%;
	margin-bottom: 2%;
	height: 50px;
	width: 50%;
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 3%;
`;
