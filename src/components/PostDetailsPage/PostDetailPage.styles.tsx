import { DODGERBLUE_COLOR, GREY, LIGHTBLUE_COLOR, WHITE_COLOR } from 'constants/colors';
import { FONT_LARGE, MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const TitleStyled = styled.p`
	font-weight: bold;
	font-size: ${props => props.theme.spacing(6)};
	color: ${props => props.theme.colors.black};
	display: flex;
	justify-content: center;
`;

export const Wrapper = styled.div`
	margin: ${props => props.theme.spacing(5)};
	padding: ${props => props.theme.spacing(5)};
	border-radius: ${props => props.theme.spacing(5)};
`;

export const WrapperWithBorder = styled.div`
	border: 2px solid ${props => props.color || props.theme.colors.gray};
	border-radius: 10px;
	width: 90%;
	text-align: center;
`;

export const CategoryStyled = styled.div`
	border: 2px solid ${props => props.color || props.theme.colors.gray};
	border-radius: 10px;
	padding: 10px;
	width: 300px;
	height: 55px;
	margin-left: 2%;
	font-style: italic;
	font-size: ${FONT_LARGE};
	@media (max-width: 800px) {
		width: unset;
	}
`;

export const DescriptionStyled = styled.div`
	font-size: ${MEDIUM_FONT_SIZE};
	padding-top: 80px;
	margin: 2%;
	line-height: 35px;
`;

export const Description = styled.div`
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 2%;
	line-height: 35px;
`;

export const BorderStyled = styled.div`
	border: 1px solid ${props => props.theme.colors.gray};
	color: ${props => props.theme.colors.gray};
`;

export const WrapperSkillsStyled = styled.div`
	display: flex;
	padding-top: ${props => props.theme.spacing(5)};
	align-items: flex-start;
	flex-wrap: wrap;

	@media (max-width: 800px) {
		flex-direction: column;
	}
`;

export const CategorySkillsBlock = styled.div`
	margin: 1% 2.5% 1% 2.5%;
	font-style: italic;
	font-size: ${MEDIUM_FONT_SIZE};

	& > label {
		margin: 35px;
		font-size: ${MEDIUM_FONT_SIZE};
	}
	& > p {
		margin: 15px;
	}
	@media (max-width: 800px) {
		width: 100%;
		margin-left: ${props => props.theme.spacing(0)};
	}
`;

export const SkillsItem = styled.div`
	color: ${props => props.theme.colors.green};
	padding: ${props => props.theme.spacing(1)};
	background-color: ${props => props.theme.colors.ligntGreen};
	border-radius: 20px;
	margin: ${props => props.theme.spacing(2)};
	text-transform: capitalize;
	font-size: ${MEDIUM_FONT_SIZE};
	text-align: center;
	width: 70%;
	margin: 3% auto;
`;

export const WorkDurationStyled = styled.div`
	padding-left: ${props => props.theme.spacing(3)};
`;

export const HourRateStyled = styled.div`
	text-align: center;
	padding: ${props => props.theme.spacing(3)};
	margin: 8%;
`;

export const SendProposal = styled.button`
	width: 180px;
	height: 55px;
	border-radius: 10px;
	background-color: ${DODGERBLUE_COLOR};
	color: ${WHITE_COLOR};
	border-color: ${WHITE_COLOR};
	margin: auto;
	text-align: center;
	font-size: ${FONT_LARGE};
	box-shadow: 3px 2px 2px ${GREY};
	&:hover {
		background-color: ${LIGHTBLUE_COLOR};
	}
	& > .hidden {
		display: none;
	}
	& > .block {
		display: block;
	}
	&active {
		box-shadow: 0 5px;
		transform: translateY(10px);
	}
`;
export const Column = styled.div`
	display: flex;
	float: left;
	width: 50%;
	@media (max-width: 800px) {
		width: 100%;
	}
`;
export const MinColumn = styled.div`
	float: left;
	width: 20%;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
	& > div {
		font-style: italic;
		font-size: ${MEDIUM_FONT_SIZE};
	}
`;
export const MaxColumn = styled.div`
	float: left;
	width: 80%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;
export const FullColumn = styled.div`
	float: left;
	width: 95%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	margin-bottom: 2%;
	text-align: center;
`;

export const P1 = styled.p`
	font-size: ${FONT_LARGE};
	margin: auto;
	text-align: center;
`;

export const ClientInfoDescription = styled.p`
	margin: 4% auto;
	font-style: italic;
`;

export const Label = styled.label`
	margin-left: 100px;
`;
