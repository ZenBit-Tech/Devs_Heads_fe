import styled from 'styled-components';
import { BLACK_COLOR, GREEN_COLOR, WHITE_COLOR } from 'constants/colors';
import { LARGE_FONT_SIZE } from 'constants/fonts';

export const Container = styled.div`
	border: 1px solid ${BLACK_COLOR};
	padding: 5px;
`;

export const InputBlock = styled.div`
	width: 600px;
	margin: 30px auto;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`;

export const StyledInput = styled.input`
	width: 400px;
	border-radius: 5px;
`;

export const StyledLabel = styled.label`
	font-size: ${LARGE_FONT_SIZE};
`;

export const SaveButton = styled.button`
	display: block;
	font-size: ${LARGE_FONT_SIZE};
	width: 200px;
	height: 50px;
	border-radius: 10px;
	background-color: ${GREEN_COLOR};
	color: ${WHITE_COLOR};
	border-color: ${WHITE_COLOR};
	margin: 0 auto;
`;

export const Form = styled.form`
	width: border-box;
`;
