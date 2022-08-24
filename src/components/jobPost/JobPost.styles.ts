import { DEFAULT_COLOR, DODGERBLUE_COLOR, WHITE_COLOR } from 'constants/colors';
import { LARGE_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Container = styled.div`
	padding: 1% 8% 1% 8%;
	font-size: 20px;
`;

export const Title = styled.div`
	font-size: ${LARGE_FONT_SIZE};
	margin-top: 15px;
	font-weight: 500;
`;

export const StyledTextarea = styled.textarea<{ height: string; width: string }>`
	width: ${props => props.width};
	height: ${props => props.height};
	resize: none;
`;

export const Category = styled.div`
	& > select {
		width: 80%;
	}
`;

export const SkillsButtonsBlock = styled.div`
	max-width: 700px;
`;

export const SkillButton = styled.button<{ selected: boolean }>`
	width: 170px;
	border-radius: 10px;
	margin: 5px;
	height: 40px;
	background-color: ${props => (props.selected ? DODGERBLUE_COLOR : DEFAULT_COLOR)};
	color: ${props => (props.selected ? WHITE_COLOR : DEFAULT_COLOR)};
`;

export const CheckBoxLabel = styled.label`
	padding: 5px;
`;

export const Li = styled.li`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

export const CreateButton = styled.button`
	width: 140px;
	height: 50px;
	border-radius: 10px;
	background-color: ${DODGERBLUE_COLOR};
	color: ${WHITE_COLOR};
	border-color: ${WHITE_COLOR};
	margin: 0 auto;
	text-align: center;
	&:hover {
		background-color: #4961eb;
	}
	&active {
		box-shadow: 0 5px #666;
		transform: translateY(10px);
	}
`;

export const Column = styled.div`
	float: left;
	width: 50%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const CurrencyColumn = styled.div`
	float: left;
	width: 50%;
	padding: 10px;
	@media screen and (max-width: 1500px) {
		width: 100%;
	}
`;

export const CheckLabel = styled.label`
	padding: 2%;
`;
