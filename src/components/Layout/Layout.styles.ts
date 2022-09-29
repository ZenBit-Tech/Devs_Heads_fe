import styled from 'styled-components';
import { MEDIUM_FONT_SIZE } from 'constants/fonts';

export const Image = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 6px;
	@media (max-width: 860px) {
		width: 45px;
		height: 45px;
	}
`;
export const DropdownMenu = styled.div`
	padding: unset;
`;
export const BoderNav = styled.div`
	&:nth-child(1) {
		border-bottom: 2px solid ${props => props.theme.colors.lightGray};
	}
`;
export const LiSetting = styled.li`
	button:focus {
		outline: none;
	}
`;

export const Li = styled.li`
	margin: 10px 20px 10px 20px;
	cursor: pointer;
	text-transform: uppercase;
	font-size: ${MEDIUM_FONT_SIZE};
	border-radius: ${props => props.theme.spacing(1)};
	padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(10)};
	border: 2px solid ${props => props.theme.colors.lightGray};
	button:focus {
		outline: none;
	}
	@media (max-width: 1070px) {
		padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(1.5)};
		text-transform: capitalize;
	}
	@media (max-width: 650px) {
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.555);
		text-align: center;
		margin-right: 0px;
		padding: 20px 0;
		&:nth-child(1) {
			border-top: unset;
		}
	}
`;

export const Navigation = styled.nav`
	top: 0;
	width: 100%;
	margin: 25px 5px 25px 5px;
	@media (max-width: 650px) {
		margin: unset;
	}
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
	display: none;
	padding: 5px;
	font-size: ${MEDIUM_FONT_SIZE};
	@media screen and (max-width: 650px) {
		display: block;
		z-index: 11;
	}
`;

export const Div = styled.div`
	margin: 10px 20px 10px 20px;
	cursor: pointer;
	border-radius: ${props => props.theme.spacing(1)};
	padding: ${props => props.theme.spacing(0)} ${props => props.theme.spacing(5)};
	border: 2px solid ${props => props.theme.colors.lightGray};
`;

export const MenuSetting = styled.div`
	margin-right: 60px;

	&.dropdown-menu:hover {
		color: ${props => props.theme.colors.darkBlack};
		text-decoration: none;
		background-color: ${props => props.theme.colors.backgroundGray};
	}
	& > .dropdown-item:hover {
		background-color: unset;
	}
`;

export const BtnMenu = styled.button`
	&:focus {
		box-shadow: 0000;
		outline: 0;
	}
`;
