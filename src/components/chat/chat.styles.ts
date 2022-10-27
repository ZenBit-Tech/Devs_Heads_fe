import {
	BLACK_COLOR,
	COLOR_GREY,
	GREY,
	LIGHTGREY_COLOR,
	LIGHT_GREY,
	WHITE_COLOR,
} from 'constants/colors';
import { MEDIUM_FONT_SIZE, SMALL_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Column = styled.div`
	float: left;
	width: 50%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;
export const UsersList = styled.ul`
	list-style-type: none;
	padding-left: 0;
	overflow-y: auto;
	width: 30%;
	background-color: ${WHITE_COLOR};
	height: 600px;
	border-right: 1px solid ${GREY};
	margin: 0;

	&::-webkit-scrollbar {
		width: 0.2rem;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${COLOR_GREY};
		width: 0.1rem;
		border-radius: 1rem;
	}
`;

export const SingleUser = styled.li`
	border-bottom: 1px solid ${LIGHTGREY_COLOR};
	&:last-child {
		border-bottom: unset;
	}
	& > div {
		display: grid;
		grid-template-columns: 40px 1fr -webkit-max-content;
		grid-template-columns: 40px 1fr max-content;
		grid-gap: 10px;
		color: black;
		font-size: 1.3rem;
		padding: 20px 20px 20px 15px;
		position: relative;
	}

	& > div:hover {
		background: ${COLOR_GREY};
		cursor: pointer;
	}

	&.defaultActive {
		background-color: ${COLOR_GREY};
	}
`;

export const ChatImage = styled.img`
	grid-row: span 2;
	height: 50px;
	width: 50px;
	border-radius: 100%;
`;

export const Title = styled.div`
	font-weight: bold;
	padding-left: 15px;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;
`;

export const LastMessage = styled.div`
	grid-column: span 2;
	color: gray;
	padding-left: 15px;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;
`;

export const Wrapper = styled.form`
	width: 70%;
	display: flex;
	margin: 0 auto;
	border: 1px solid ${GREY};
`;

export const DateTime = styled.div`
	white-space: nowrap;
	margin-top: 6px;
`;

//chat style
export const ChatWrapper = styled.div`
	width: 100%;
	position: relative;
	border: 1px solid ${GREY};
`;

export const Button = styled.button`
	border: 1px solid ${LIGHT_GREY};
	border-radius: 10px;
	padding: 10px 20px;
	width: 50%;
	margin-bottom: 5%;
	background-color: ${LIGHT_GREY};
	color: ${LIGHT_GREY};
	margin-right: 10%;
	text-align: center;
	font-size: ${MEDIUM_FONT_SIZE};
	box-shadow: 3px 2px 2px ${GREY};
	cursor: pointer;
	&.defaultActive {
		background-color: ${LIGHT_GREY};
		color: ${WHITE_COLOR};
	}
`;

export const ChatMessages = styled.div`
	width: 100%;
	position: relative;
	padding: 1rem 2rem;
	display: flex;
	height: 600px;
	flex-direction: column;
	background-color: ${WHITE_COLOR};
	margin-bottom: 100px;
	overflow-y: scroll;
	gap: 1rem;
	&::-webkit-scrollbar {
		width: 0.2rem;
		&-thumb {
			background-color: ${COLOR_GREY};
			width: 0.1rem;
			border-radius: 1rem;
		}
	}
`;
export const MessageBlock = styled.div`
	margin-left: 0;
`;

export const Message = styled.div`
	display: flex;
	align-items: center;
	&.date {
		color: ${BLACK_COLOR};
		padding-top: 8px;
	}

	& > .content {
		overflow-wrap: break-word;
		padding: 10px;
		max-width: 70%;
		font-size: 1.1rem;
		border-radius: 1rem;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			max-width: 70%;
		}
	}
	& > img {
		grid-row: span 2;
		height: 50px;
		width: 50px;
		border-radius: 100%;
		margin-right: 10px;
	}
	&.sended {
		justify-content: flex-start;
		& > .content {
			background-color: ${COLOR_GREY};
			color: ${BLACK_COLOR};
		}
	}
	&.recieved {
		justify-content: flex-end;
		& > .content {
			background-color: ${LIGHT_GREY};
			color: ${BLACK_COLOR};
		}
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

export const ButtonChat = styled.button`
	width: 100px;
	padding: 7px;
	border-radius: 10px;
	background-color: ${GREY};
	color: ${WHITE_COLOR};
	border-color: ${WHITE_COLOR};
	margin: 2% 4px;
	text-align: center;
	font-size: ${SMALL_FONT_SIZE};
	box-shadow: 3px 2px 2px ${GREY};
	&:hover {
		background-color: ${GREY};
	}
	&:active {
		box-shadow: 0 5px;
		transform: translateY(10px);
	}
`;

export const ButtonBlock = styled.div`
	display: flex;
	justify-content: flex-start;
`;

export const RightLi = styled.li`
	list-style-type: none;
	text-align: right;
`;

export const LeftLi = styled.li`
	list-style-type: none;
	text-align: left;
`;
//input style
export const InputBlock = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
	bottom: 0;
	left: 0;
	width: 100%;
	position: absolute;
	background-color: ${COLOR_GREY};

	& > .ant-btn {
		height: 40px;
	}
	& > button {
		border-radius: 30px;
		display: flex;
		justify-content: center;
		cursor: pointer;
		align-items: center;
		border: none;
		&:focus {
			outline: none;
		}
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			padding: 0.3rem 1rem;
			svg {
				font-size: 1rem;
			}
		}
		svg {
			font-size: 2rem;
			color: $mesage-color;
		}
	}
`;

//chatTitle
export const TitleMessage = styled.div`
	background-color: ${COLOR_GREY};
	position: relative;
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	color: black;
	font-weight: bold;
	font-size: 2rem;
	padding: 10px 20px;
	z-index: 1;
	border-bottom: 1px solid ${BLACK_COLOR};
`;

export const ArrowBlock = styled.div`
	display: flex;
	align-items: center;
	& > img {
		grid-row: span 2;
		height: 50px;
		width: 50px;
		border-radius: 100%;
		margin: 0 15px 0 15px;
	}
	&.arrowRight {
		display: none;
		padding: 0 10px 0 10px;

		@media (max-width: 1020px) {
			display: inline;
			width: 50px;
			height: 50px;
			color: ${BLACK_COLOR};
		}
	}
`;

export const TitleChat = styled.p`
	font-size: 20px;
	color: black;
	margin: unset;
	font-weight: bold;
`;

//search
export const SearchWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

export const Btn = styled.button`
	margin: 0% 5% 0% 5%;
	width: 90%;
	&:hover {
		background-color: ${COLOR_GREY};
	}
`;
