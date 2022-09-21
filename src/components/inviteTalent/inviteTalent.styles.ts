import styled from 'styled-components';
import { BLACK_COLOR, BLUE, WHITE, GREY } from 'constants/colors';
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
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	border: none;
	cursor: pointer;
	order: 1;
	margin-top: 50px;
	margin-left: 100px;
	height: 40px;
	width: 40px;
`;

export const Img = styled.img`
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
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	margin-top: 100px;
	margin-left: 40%;
	background: ${BLUE};
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${LARGE_FONT_SIZE};
	height: 50px;
	width: 10%;
`;

export const Modal = styled.div`
	background: ${WHITE};
	align-content: center;
	display: block;
	position: relative;
	border: 1px solid ${BLACK_COLOR};
	border-radius: 10px;
	margin-top: 20px;
	height: 600px;
	width: 600px;
`;

export const Header = styled.header`
	border-bottom: 1px solid ${GREY};
	font-size: ${MEDIUM_FONT_SIZE};
	text-align: center;
	width: 100%;
`;

export const Content = styled.div`
	align-content: center;
	display: flex;
	flex-flow: column wrap;
	margin-top: 10px;
	padding: 10px 5px;
	width: 100%;
`;

export const Actions = styled.div`
	display: flex;
	flex-flow: column wrap;
	text-align: center;
	margin-top: 5px;
	width: 100%;
`;

export const Select = styled.select`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	align-self: center;
	margin-top: 30px;
	border-radius: 10px;
	height: 30px;
	width: 80%;
`;

export const SendMessage = styled.button`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	align-self: center;
	margin-top: 120px;
	background: ${BLUE};
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${MEDIUM_FONT_SIZE};
	height: 50px;
	width: 300px;
`;

export const Close = styled.button`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	cursor: pointer;
	display: block;
	padding: 2px 5px;
	margin-top: 10px;
	margin-left: 550px;
	font-size: ${LARGE_FONT_SIZE};
`;

export const JobPost = styled.button`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	align-self: center;
	margin-top: 100px;
	background: ${BLUE};
	border-radius: 6px;
	color: ${WHITE};
	font-size: ${MEDIUM_FONT_SIZE};
	height: 50px;
	width: 200px;
`;

export const JobPopup = styled.div`
	background: ${WHITE};
	align-content: center;
	display: block;
	position: relative;
	border: 1px solid ${BLACK_COLOR};
	border-radius: 10px;
	margin-top: 20px;
	height: 300px;
	width: 400px;
`;

export const ClosePopup = styled.button`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
	cursor: pointer;
	display: block;
	padding: 2px 5px;
	margin-top: 10px;
	margin-left: 350px;
	font-size: ${LARGE_FONT_SIZE};
`;

export const Span = styled.span`
	font-size: ${MEDIUM_FONT_SIZE};
	margin-left: 50px;
`;
