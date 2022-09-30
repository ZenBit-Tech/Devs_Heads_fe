import styled from 'styled-components';
import ReactSelect from 'react-select';
import { GREY_BLUE_COLOR, GREY_LIGHT_COLOR, LIGHTBLUE_COLOR } from 'constants/colors';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';

export const TitleStyled = styled.p`
	font-weight: ${props => props.theme.font_weight.bold};
	font-size: ${LARGE_FONT_SIZE};
`;

export const DescriptionDataStyled = styled.p`
	height: 30px;
	overflow: hidden;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const DescriptionStyled = styled.p`
	font-weight: ${props => props.theme.font_weight.bold};
	margin: auto;
`;

export const ColumnSmall = styled.div`
	float: left;
	margin-left: 1%;
	width: 30%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const ColumnBig = styled.div`
	float: left;
	margin-left: 1%;
	margin-right: 5%;
	width: 62%;
	padding: 20px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const Li = styled.li`
	margin-left: 1%;
	font-size: ${MEDIUM_FONT_SIZE};
`;

export const FilterLabel = styled.label`
	background-color: ${props => props.theme.colors.gray};
	height: 40px;
	width: 50%;
	margin: auto;
	margin-bottom: 15px;
	border-radius: 5px;
	font-size: ${MEDIUM_FONT_SIZE};
	color: ${props => props.theme.colors.white};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const SkillsLabel = styled.label`
	border: 1px solid ${props => props.theme.colors.gray};
	height: 40px;
	width: 70%;
	margin: auto;
	margin-bottom: 15px;
	border-radius: 5px;
	font-size: ${MEDIUM_FONT_SIZE};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const SkillsButtonsBlock = styled.div`
	max-width: 100%;
`;

export const Label = styled.label`
	width: 150px;
	margin: 5px;
	height: 30px;
`;

export const ClearBtn = styled.button`
	background-color: ${props => props.theme.colors.white};
	color: ${LIGHTBLUE_COLOR};
	border: 2px solid ${LIGHTBLUE_COLOR};
	border-radius: 5px;
	padding: 10px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 4px 2px;
	cursor: pointer;
	-webkit-transition-duration: 0.4s;
	transition-duration: 0.4s;
	&:hover {
		background-color: ${LIGHTBLUE_COLOR};
		color: white;
		box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
	}
`;

export const CategoryDiv = styled.div`
	margin: 5%;
	height: 50px;
`;

export const CheckLabel = styled.label`
	width: 300px;
	display: inline-block;
`;

export const SearchInput = styled.input`
	width: 60%;
	padding: 12px 20px;
	box-sizing: border-box;
	border: 1px solid ${props => props.theme.colors.gray};
	border-radius: 5px;
	-webkit-transition: 0.5s;
	transition: 0.5s;
	outline: none;
	font-size: ${MEDIUM_FONT_SIZE};
	&:focus {
		border: 3px solid #555;
	}
`;

export const CustomSelect = styled(ReactSelect)`
	font-size: ${MEDIUM_FONT_SIZE};
	border: 1px solid ${props => props.theme.colors.gray};
	border-radius: 5px;
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	margin-left: 42%;
	color: ${LIGHTBLUE_COLOR};
`;

export const Div = styled.div`
	margin-left: 30%;
`;

export const Span = styled.span`
	font-size: ${MEDIUM_FONT_SIZE};
	margin-left: 5%;
	justify-content: center;
	align-items: center;
`;

export const Column = styled.div`
	float: left;
	width: 50%;
	padding: 10px;
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;
export const Img = styled.img`
	width: 30%;
	height: 30%;
	display: block;
	margin: auto;
`;

export const H3 = styled.h3`
	text-align: center;
	color: ${GREY_BLUE_COLOR};
`;

export const H5 = styled.h5`
	text-align: center;
	color: ${GREY_LIGHT_COLOR};
`;

export const ImgSpinner = styled.img`
	display: block;
	margin: auto;
`;
