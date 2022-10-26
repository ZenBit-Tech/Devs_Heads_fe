import styled from 'styled-components';
import { BLACK_COLOR, BLUE, WHITE } from 'constants/colors';
import { FONT_MEDIUM, MEDIUM_FONT_SIZE } from 'constants/fonts';

export const P2 = styled.h4`
	align-self: flex-start;
	font-size: ${FONT_MEDIUM};
	font-weight: bold;
	margin: 5px;
	margin-top: -20px;
	margin-left: 180px;
`;

export const P = styled.p`
	font-size: ${FONT_MEDIUM};
	margin: 5px;
	margin-right: 250px;
`;

export const Modal = styled.div`
	background: ${WHITE};
	align-content: center;
	display: block;
	position: relative;
	border: 1px solid ${BLACK_COLOR};
	border-radius: 10px;
	margin-top: 20px;
	height: 250px;
	width: 400px;
`;

export const Header = styled.header`
	font-size: ${MEDIUM_FONT_SIZE};
	text-align: center;
	margin-top: 10px;
	width: 100%;
`;

export const Content = styled.div`
	display: flex;
	flex-flow: column wrap;
	width: 100%;
`;

export const Actions = styled.div`
	align-content: center;
	display: flex;
	flex-flow: row wrap;
	margin-left: 100px;
	margin-top: 25px;
	width: 100%;
`;

export const BtnAccept = styled.button`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	background: ${BLUE};
	border-radius: 3px;
	color: ${WHITE};
	font-size: ${FONT_MEDIUM};
	margin-right: 10px;
	margin-bottom: 10px;
	height: 30px;
	width: 90px;
`;

export const BtnDecline = styled.button`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	background: ${BLUE};
	border-radius: 3px;
	color: ${WHITE};
	font-size: ${FONT_MEDIUM};
	margin-bottom: 10px;
	height: 30px;
	width: 90px;
`;

export const Span = styled.span`
	font-size: ${MEDIUM_FONT_SIZE};
	margin-left: 50px;
`;
