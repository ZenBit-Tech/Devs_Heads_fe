import styled from 'styled-components';
import { LIGHTBLUE_COLOR } from 'constants/colors';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;

export const Image = styled.img`
	width: 65px;
	height: 65px;
	border-radius: 6px;

	@media (max-width: 860px) {
		width: 45px;
		height: 45px;
	}
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

export const BoderNav = styled.div`
	&:nth-child(1) {
		border-bottom: 2px solid ${props => props.theme.colors.lightGray};
	}
`;
export const Border = styled.li`
	margin: 10px 20px 10px 10px;
	cursor: pointer;
	text-transform: uppercase;
	font-size: ${MEDIUM_FONT_SIZE};
	border-radius: ${props => props.theme.spacing(2)};
	padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(5)};
	border: 2px solid ${props => props.theme.colors.lightGray};

	button:focus {
		outline: none;
	}
	@media (max-width: 840px) {
		padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(2.5)};
		text-transform: capitalize;
	}

	@media (max-width: 650px) {
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.555);
		text-align: center;
		margin-right: 0px;
		padding: 20px 0;

		&:nth-child(1) {
			border-top: 1px solid rgba(255, 255, 255, 0.555);
			margin-top: 50px;
		}
	}
`;

export const Navigation = styled.nav`
	top: 0;
	width: 100%;
	height: 50px;
	margin-bottom: 25px;
`;
export const UlNav = styled.ul`
	list-style-type: none;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	@media screen and (max-width: 650px) {
		flex-direction: column;
		background: ${props => props.theme.colors.lightGray};
		height: auto;
		z-index: 10;
	}
`;

export const ButtonText = styled.button`
	 {
		display: none;
		position: absolute;
		right: 10px;
		top: 7px;
		padding: 5px;
		color: #000;
		font-size: 18px;

		@media screen and (max-width: 650px) {
			display: block;
			z-index: 11;
		}
	}
`;
