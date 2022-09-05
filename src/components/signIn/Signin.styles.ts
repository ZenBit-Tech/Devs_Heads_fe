import styled from 'styled-components';
import { BLUE, GREY, WHITE } from 'constants/styles';
import { RED_COLOR } from 'constants/colors';

export const Div = styled.div`
	margin: auto;
	width: 50%;
	@media screen and (max-width: 600px) {
		width: 90%;
	}
`;

export const Div2 = styled.div`
	display: flex;
	text-align: center;
	justify-content: space-around;
	margin: auto;
`;

export const H1 = styled.h2`
	text-align: center;
`;

export const H2 = styled.h3`
	text-align: center;
`;

export const P = styled.p`
	font-size: 1vw;
	font-weight: bold;
	margin-top: 2px;
	margin-left: 70px;
`;

export const ErrorP = styled.p`
	color: ${RED_COLOR};
	font-size: 1.2vw;
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
	display: flex;
	flex-flow: column wrap;
	margin-top: 30px;
	font-size: 1.2vw;
`;

export const LinkStyle = styled.div`
	margin-top: 10px;
	margin-left: 55%;
`;

export const Button = styled.button`
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: 1.5vw;
	margin: auto;
	margin-top: 2%;
	margin-bottom: 2%;
	height: 50px;
	width: 50%;
`;
