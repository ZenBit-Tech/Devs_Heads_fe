import styled, { createGlobalStyle } from 'styled-components';
import { GREY, WHITE, DODGERBLUE_COLOR } from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';

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

export const Title = styled.h2`
	margin-bottom: 25px;
`;

export const H1 = styled.h2`
	text-align: center;
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
		outline: 2px solid ${DODGERBLUE_COLOR};
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
