import { MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const Wrapper = styled.div`
	border: 1px solid ${props => props.theme.colors.black};
	border-radius: ${props => props.theme.spacing(5)};
	margin: ${props => props.theme.spacing(5)};
	padding: ${props => props.theme.spacing(5)};
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const TitleStyled = styled.p`
	font-weight: ${props => props.theme.font_weight.bold};
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const DescriptionDataStyled = styled.p`
	height: ${props => props.theme.spacing(8)};
	overflow: hidden;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const DateStyled = styled.div`
	width: ${props => props.theme.spacing(60)};
	height: ${props => props.theme.spacing(8)};
	display: flex;
	align-items: center;
	background-color: ${props => props.theme.colors.gray};
	color: ${props => props.theme.colors.white};
	border-radius: ${props => props.theme.spacing(1)};
	padding-left: ${props => props.theme.spacing(3)};
	margin-left: auto;
	font-size: ${MEDIUM_FONT_SIZE};
`;
export const NonPostWrapper = styled.div`
	text-align: center;
`;

export const DescriptionStyled = styled.p`
	font-weight: ${props => props.theme.font_weight.bold};
	margin-top: ${props => props.theme.spacing(9)};
`;

export const ImageStyled = styled.img`
	margin: 0 auto;
`;

export const ButtonStyled = styled.button`
	margin-top: ${props => props.theme.spacing(15)};
	min-width: ${props => props.theme.spacing(38)};
	border-radius: ${props => props.theme.spacing(6)};
	height: ${props => props.theme.spacing(10)};
	background-color: ${props => props.theme.colors.black};
	color: ${props => props.theme.colors.white};
`;
