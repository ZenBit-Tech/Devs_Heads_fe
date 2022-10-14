import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
  overflow-x: hidden;
  }
`;

export const MainBlockWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: ${props => props.theme.spacing(12.5)};
`;

export const Wrapper = styled.div`
	width: 80%;

	@media (max-width: 1000px) {
		margin: 15px 10px 0 10px;
		width: 100%;
	}
`;
export const SkillsBlock = styled.div`
	margin-top: 50px;
	z-index: 0;
`;

export const WrapperSidePanel = styled.div`
	margin: ${props => props.theme.spacing(2.5)} auto;
	margin: ${props => props.theme.spacing(7.5)} ${props => props.theme.spacing(3.75)} 0
		${props => props.theme.spacing(3.75)};
	width: 30%;
	justify-content: flex-start;
	display: flex;
	flex-direction: column;
	@media (max-width: 920px) {
		width: unset;
	}
`;

export const Title = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: ${props => props.theme.spacing(10)};
	font-weight: bold;
	font-size: ${props => props.theme.spacing(6.75)};
	align-items: center;
	&.filterTitle {
		font-size: ${props => props.theme.spacing(5)};
		margin: ${props => props.theme.spacing(5)} ${props => props.theme.spacing(5)};
	}
	.arrowRight {
		display: none;
		padding: 0 10px 0 10px;
		@media (max-width: 1020px) {
			display: inline;
			width: 50px;
			height: 30px;
			color: black;
		}
	}
`;

export const Input = styled.input`
	height: ${props => props.theme.spacing(15)};
	width: ${props => props.theme.spacing(20)};
	padding-left: ${props => props.theme.spacing(7.5)};
	border: 1px solid ${props => props.theme.colors.grayLight};
	width: 100%;
	&::placeholder {
		color: black;
	}
`;

export const BorderStyled = styled.div`
	border: 2px solid ${props => props.theme.colors.grayLight};
	border-radius: ${props => props.theme.spacing(2)};
	width: ${props => props.theme.spacing(51)};
	padding: ${props => props.theme.spacing(3)} ${props => props.theme.spacing(5)};
	height: ${props => props.theme.spacing(12)};
	margin: ${props => props.theme.spacing(10)} auto;
	font-weight: bold;
	&.borderResults {
		margin-top: ${props => props.theme.spacing(80)};
		width: 100%;
		height: unset;
	}
	@media (max-width: 800px) {
		width: unset;
	}
`;

export const SkillsButtonsBlock = styled.div`
	max-width: 100%;
`;
export const Label = styled.label`
	width: ${props => props.theme.spacing(42.5)};
	margin: ${props => props.theme.spacing(1.25)};
	height: ${props => props.theme.spacing(10)};
`;

export const Button = styled.div`
	margin-bottom: ${props => props.theme.spacing(2.5)};
	cursor: pointer;
	&.defaultActive > span {
		border-bottom: 1px solid black;
	}
`;
export const ButtonBlock = styled.div`
	display: block;
	justify-content: flex-start;
	margin: 0 auto;
`;
export const InputContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 0 auto;
	max-width: 800px;
`;
export const IconSearch = styled.div`
	height: 1.5rem;
	width: 1.5rem;
	padding: ${props => props.theme.spacing(1)};
	margin-left: ${props => props.theme.spacing(1.25)};
	cursor: pointer;
	position: absolute;
	box-sizing: border-box;
	top: 34%;
	left: ${props => props.theme.spacing(0.5)};
`;
export const ProfileBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: ${props => props.theme.spacing(10)};
	padding-bottom: ${props => props.theme.spacing(5)};

	&.notFound {
		display: flex;
		justify-content: center;
	}
`;
export const PaginationBlock = styled.div`
	width: 60%;
	margin: ${props => props.theme.spacing(7.5)} auto;
	@media (max-width: 800px) {
		width: 95%;
	}
`;

export const ProfileData = styled.div`
	border: 3px solid ${props => props.theme.colors.grayLight};
	padding: ${props => props.theme.spacing(1.25)} 0 ${props => props.theme.spacing(1.25)}
		${props => props.theme.spacing(1.25)};
	& > p {
		margin: 0;
	}
`;

export const ProfileImage = styled.img`
	width: ${props => props.theme.spacing(25)};
	height: ${props => props.theme.spacing(25)};
	border-radius: 50%;
	@media (max-width: 800px) {
		width: ${props => props.theme.spacing(10)};
		height: ${props => props.theme.spacing(10)};
	}
`;

export const ProfilePhoto = styled.div`
	width: 150px;
	height: 143px;
`;

export const ImageWrapperBlock = styled.div`
	display: flex;
	justify-content: center;
`;

export const ImageWrapper = styled.i`
	background: gray;
	border-radius: ${props => props.theme.spacing(5)};
	font-size: ${props => props.theme.spacing(6.25)};
	text-align: center;
	margin-right: ${props => props.theme.spacing(2.5)};
	border-radius: 50%;
	display: inline-block;
	padding: ${props => props.theme.spacing(6.25)};
`;

export const PhotoWrapper = styled.i`
	border-radius: ${props => props.theme.spacing(5)};
	font-size: ${props => props.theme.spacing(6.25)};
	text-align: center;
	margin-right: ${props => props.theme.spacing(2.5)};
	border-radius: 50%;
	display: inline-block;
	padding: 25px;
`;

export const TitleDiv = styled.div`
	display: flex;
	margin-top: -100px;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (max-width: 1017px) {
		margin-top: 25px;
	}
`;
