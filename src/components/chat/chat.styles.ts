import {
	DODGERBLUE_COLOR,
	GREY,
	LIGHTBLUE_COLOR,
	LIGHTGREY_COLOR,
	WHITE_COLOR,
} from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Column = styled.div`
	float: left;
	width: 50%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;
export const UsersList = styled.div`
	width: 400px;
	background-color: white;
	height: 700px;
	border: 1px solid grey;
`;
export const ChatList = styled.div`
	border: 1px solid black;
	float: left;
	width: 68%;
	padding: 10px;
	margin-right: 2%;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const Input = styled.input`
	width: 70%;
	height: 40px;
	box-sizing: border-box;
	border: 1px solid ${LIGHTGREY_COLOR};
	border-radius: 5px;
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const Button = styled.button`
	width: 140px;
	height: 50px;
	border-radius: 10px;
	background-color: ${DODGERBLUE_COLOR};
	color: ${WHITE_COLOR};
	border-color: ${WHITE_COLOR};
	margin: 2% auto;
	text-align: center;
	font-size: ${MEDIUM_FONT_SIZE};
	box-shadow: 3px 2px 2px ${GREY};
	&:hover {
		background-color: ${LIGHTBLUE_COLOR};
	}
	&active {
		box-shadow: 0 5px;
		transform: translateY(10px);
	}
`;

export const RightLi = styled.li`
	list-style-type: none;
	text-align: right;
`;

export const LeftLi = styled.li`
	list-style-type: none;
	text-align: left;
`;
