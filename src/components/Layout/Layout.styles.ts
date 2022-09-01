import styled from 'styled-components';
import { LIGHTBLUE_COLOR } from 'constants/colors';

export const Nav = styled.nav`
	display: flex;
	background: ${LIGHTBLUE_COLOR};
	margin-bottom: 10px;
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
`;
