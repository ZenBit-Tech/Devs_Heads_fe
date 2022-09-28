import styled, { createGlobalStyle } from 'styled-components';
import { GREY, WHITE, BLACK_COLOR, DODGERBLUE_COLOR } from 'constants/colors';
import { RED_COLOR } from 'constants/colors';
import { MEDIUM_FONT_SIZE, SMALL_FONT_SIZE } from 'constants/fonts';

export const GlobalStyle = createGlobalStyle`
  body {
  overflow-x: hidden;
  }
`;

export const Form = styled.form`
	align-content: center;
	display: flex;
	flex-flow: column wrap;
	margin-top: 80px;
`;

export const ControlStyle = styled.label`
	color: ${BLACK_COLOR};
	font-weight: bold;
	display: flex;
	flex-flow: column wrap;
	margin-left: 1%;
`;

export const InputBlock = styled.div`
	margin: 10px 0 10px 0;
	width: 30%;

	@media screen and (max-width: 800px) {
		width: unset;
	}
`;

export const Title = styled.h2`
	margin-bottom: 25px;
`;

export const H1 = styled.h2`
	text-align: center;
`;

export const ErrorP = styled.p`
	color: ${RED_COLOR};
	font-size: ${SMALL_FONT_SIZE};
`;

export const Input = styled.input`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	border-radius: 6px;
	border: solid 1px ${GREY};
	height: 35px;
	width: 100%;
`;

export const ButtonBlock = styled.div`
	display: flex;
	flex-direction: row-reverse;
	margin-top: 50px;
`;

export const LabelBlock = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Button = styled.button`
	background: ${DODGERBLUE_COLOR};
	border: none;
	border-radius: 10px;
	color: ${WHITE};
	font-size: ${MEDIUM_FONT_SIZE};
	padding: 10px 40px;
	height: 50px;
	box-shadow: 3px 2px 2px ${GREY};

	&:hover {
		outline: 2px solid ${GREY};
	}
`;

export const Cancel = styled.button`
	border: none;
	border-radius: 10px;
	font-weight: bold;
	margin-right: 10px;
	color: ${DODGERBLUE_COLOR};
	font-size: ${MEDIUM_FONT_SIZE};
	padding: 10px 40px;
	height: 50px;
	box-shadow: 3px 2px 2px ${GREY};
	&:hover {
		border: 2px solid ${DODGERBLUE_COLOR};
	}
`;
