import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { BLACK_COLOR } from 'constants/colors';
import { LARGE_FONT_SIZE } from 'constants/fonts';

export const Container = styled.div`
	margin: 0 auto;
	max-width: 1000px;
`;

export const Link = styled(NavLink)`
	font-size: ${LARGE_FONT_SIZE};
	margin-right: 5px;
	text-decoration: none;
	padding: 0 5px;
	color: ${BLACK_COLOR};

	&.active {
		border-width: 1px 1px 0 1px;
		border-color: ${BLACK_COLOR};
		border-style: solid;
	}
`;
