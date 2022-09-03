import styled from 'styled-components';
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
`;

export const Form = styled.form`
	align-content: center;
	border: solid 1px ${GREY};
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	margin-top: 30px;
	margin-left: 50px;
	height: 200px;
	width: 500px;
`;

export const Input = styled.input`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	border-radius: 6px;
	border: solid 1px ${GREY};
	margin-top: 30px;
	margin-left: 25px;
	height: 35px;
	width: 350px;
`;

export const Button = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${MEDIUM_FONT_SIZE};
	height: 40px;
	margin-top: 40px;
	margin-bottom: 10px;
	height: 40px;
	width: 150px;
`;
