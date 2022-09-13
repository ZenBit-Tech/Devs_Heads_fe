import styled from 'styled-components';
import { BLACK_COLOR, BLUE, WHITE } from 'constants/colors';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';

export const Container = styled.div`
	border: 1px solid ${props => props.theme.colors.black};
	border-radius: ${props => props.theme.spacing(5)};
	margin: ${props => props.theme.spacing(5)};
	padding: ${props => props.theme.spacing(5)};
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const Div1 = styled.div`
	align-content: center;
	display: flex;
	flex-flow: row wrap;
`;

export const Div2 = styled.div`
	order: 0;
	align-content: center;
	display: flex;
	flex-flow: column wrap;
	margin-left: 50px;
	margin-top: 50px;
`;

export const Div3 = styled.div`
	margin-left: 300px;
	margin-top: 40px;
`;

export const H3 = styled.h3`
	font-weight: bold;
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const Image = styled.img`
	order: -1;
	margin-left: 300px;
	margin-top: 30px;
	height: 100px;
	width: 100px;
`;

export const Save = styled.div`
	border: none;
	order: 1;
	margin-top: 50px;
	margin-left: 100px;
	height: 40px;
	width: 40px;
`;

export const Img = styled.img`
	border: none;
	align-content: center;
	height: 30px;
	width: 30px;
`;

export const H5 = styled.h5`
	margin-left: 300px;
	margin-top: 60px;
	font-weight: bold;
`;

export const Invite = styled.button`
	margin-top: 100px;
	margin-left: 40%;
	background: ${BLUE};
	border: none;
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${LARGE_FONT_SIZE};
	height: 50px;
	width: 10%;
`;

export const Modal = styled.div`
	font-size: 12px;
`;

export const Header = styled.header`
	width: 100%;
	border-bottom: 1px solid gray;
	font-size: 18px;
	text-align: center;
	padding: 5px;
`;

export const Content = styled.div`
	width: 100%;
	padding: 10px 5px;
`;

export const Actions = styled.div`
	width: 100%;
	padding: 10px 5px;
	margin: auto;
	text-align: center;
`;

export const Close = styled.button`
	cursor: pointer;
	position: absolute;
	display: block;
	padding: 2px 5px;
	line-height: 20px;
	right: -10px;
	top: -10px;
	font-size: 24px;
	background: #ffffff;
	border-radius: 18px;
	border: 1px solid #cfcece;
`;
