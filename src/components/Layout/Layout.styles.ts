import styled from 'styled-components';
import { LIGHTBLUE_COLOR } from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';

export const Nav = styled.nav`
	display: flex;
	margin-bottom: 10px;
	border-bottom: 2px solid ${LIGHTBLUE_COLOR};
`;

export const Image = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 6px;
`;

export const Ul = styled.ul`
	align-content: space-between;
	align-item: center;
	display: flex;
	flex-flow: row;
	margin-left: 10px;
`;

export const Li = styled.li`
	margin-top: 10px;
	margin-left: 30px;
	color: ${LIGHTBLUE_COLOR};
	font-size: ${MEDIUM_FONT_SIZE};
`;
