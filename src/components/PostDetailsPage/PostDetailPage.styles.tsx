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
	border: 1px solid ${props => props.theme.colors.black};
	border-radius: ${props => props.theme.spacing(5)};
`;
export const CategoryStyled = styled.div`
	border: 2px solid ${props => props.color || props.theme.colors.gray};
	border-radius: ${props => props.theme.spacing(2)};
	width: ${props => props.theme.spacing(51)};
	padding: ${props => props.theme.spacing(3)} ${props => props.theme.spacing(5)};
	height: ${props => props.theme.spacing(12)};
	margin-bottom: ${props => props.theme.spacing(8)};
	font-weight: bold;

	@media (max-width: 800px) {
		width: unset;
	}
`;

export const DescriptionStyled = styled.div`
	font-size: ${props => props.theme.spacing(4)};
	padding-bottom: ${props => props.theme.spacing(10)};
`;

export const BorderStyled = styled.div`
	border: 1px solid ${props => props.theme.colors.gray};
	color: ${props => props.theme.colors.gray};
`;

export const WrapperSkillsStyled = styled.div`
	display: flex;
	padding-top: ${props => props.theme.spacing(5)};
	align-items: flex-start;

	@media (max-width: 800px) {
		flex-direction: column;
	}
`;

export const CategorySkillsBlock = styled.div`
	margin: ${props => props.theme.spacing(0)} ${props => props.theme.spacing(12)};
	${props => props.theme.spacing(8)};
	font-weight: bold;

	&:nth-child(1) {
		margin-left: ${props => props.theme.spacing(0)};
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
	border-radius: ${props => props.theme.spacing(2)};
	margin: ${props => props.theme.spacing(2)};
	text-transform: capitalize;
`;

export const WorkDurationStyled = styled.div`
	padding-left: ${props => props.theme.spacing(3)};
`;

export const HourRateStyled = styled.div`
	border-radius: ${props => props.theme.spacing(10)};
	border: 1px solid ${props => props.theme.colors.gray};
	text-align: center;
	padding: ${props => props.theme.spacing(3)};
`;

export const SendProposal = styled.button`
	width: 140px;
	height: 50px;
	border-radius: 10px;
	margin-bottom: 4%;
	margin-left: 30%;
	text-align: center;
	@media (max-width: 800px) {
		margin-left: auto;
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
