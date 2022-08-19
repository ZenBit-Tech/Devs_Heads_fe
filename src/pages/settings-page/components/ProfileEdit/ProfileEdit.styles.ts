import styled from 'styled-components';
import {
	BLACK_COLOR,
	DEFAULT_COLOR,
	DODGERBLUE_COLOR,
	GREEN_COLOR,
	WHITE_COLOR,
} from 'constants/colors';
import { LARGE_FONT_SIZE } from 'constants/fonts';

export const Container = styled.div`
	border: 1px solid ${BLACK_COLOR};
	padding: 5px;
`;

export const ProfilePhoto = styled.div`
	display: flex;
	flex-direction: column;
	align-self: center;

	& > button {
		width: 100px;
	}

	& > span {
		font-size: ${LARGE_FONT_SIZE};
	}
`;

export const Position = styled.div`
	& > input {
		width: 500px;
	}
`;

export const Category = styled.div`
	& > select {
		width: 500px;
	}
`;

export const SkillsButtonsBlock = styled.div`
	max-width: 840px;
`;
export const SkillButton = styled.button<{ selected: boolean }>`
	width: 200px;
	border-radius: 10px;
	margin: 5px;
	height: 30px;
	background-color: ${props => (props.selected ? DODGERBLUE_COLOR : DEFAULT_COLOR)};
	color: ${props => (props.selected ? WHITE_COLOR : DEFAULT_COLOR)};
`;

export const StyledTextarea = styled.textarea<{ height: string }>`
	width: 500px;
	height: ${props => props.height};
	resize: none;
`;

export const SaveButton = styled.button`
	width: 140px;
	height: 50px;
	border-radius: 10px;
	background-color: ${GREEN_COLOR};
	color: ${WHITE_COLOR};
	border-color: ${WHITE_COLOR};
	margin: 0 auto;
`;

export const Block = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
`;

export const Title = styled.div`
	font-size: ${LARGE_FONT_SIZE};
	margin-top: 15px;
`;
