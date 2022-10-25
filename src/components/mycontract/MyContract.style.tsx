import { ACE_BLUE } from 'constants/colors';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from 'constants/fonts';
import styled from 'styled-components';

export const SelectBlock = styled.div`
	display: flex;
	justify-content: flex-start;
`;
export const Title = styled.div`
	display: block;
	font-weight: bold;
	padding: ${props => props.theme.spacing(5)} 0 0 ${props => props.theme.spacing(5)};
	font-size: ${MEDIUM_FONT_SIZE};
`;
export const MainWrapper = styled.div`
	margin: ${props => props.theme.spacing(5)} auto;
	padding: ${props => props.theme.spacing(5)};
	border-radius: ${props => props.theme.spacing(5)};
	width: ${props => props.theme.spacing(250)};

	@media screen and (max-width: 1000px) {
		width: 100%;
	}
`;
export const Wrapper = styled.div`
	&.block {
		display: block;
	}

	&.hide {
		display: none;
	}
`;

export const Div = styled.div`
	margin: ${props => props.theme.spacing(5)} ${props => props.theme.spacing(5)}
		${props => props.theme.spacing(5)} 0;
	width: 200px;
`;
export const ContractContainer = styled.div`
	border: 2px solid ${props => props.theme.colors.lightGray};
	border-radius: ${props => props.theme.spacing(5)};
	margin-bottom: ${props => props.theme.spacing(10)};
	&:hover {
		background-color: ${ACE_BLUE};
	}
`;
export const ContractItem = styled.div`
	display: flex;
	align-items: center;
	padding: ${props => props.theme.spacing(5)};
	& > .link {
		width: 147px;
	}
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	padding: ${props => props.theme.spacing(5)} ${props => props.theme.spacing(5)} 0
		${props => props.theme.spacing(5)};
	align-items: center;

	&.accepted {
		border: 1px dotted green;
		border-radius: 40px;
		align-items: center;
		background-color: lightgreen;
		margin-bottom: -8px;
		align-items: center;
		padding: 10px;
	}
	&.expired {
		border: 1px dotted black;
		border-radius: 40px;
		align-items: center;
		background-color: lightgrey;
		margin-bottom: -8px;
		align-items: center;
		padding: 10px;
	}
`;

export const NotFoundContract = styled.div`
	display: flex;
	margin: ${props => props.theme.spacing(12.5)};
	font-size: ${LARGE_FONT_SIZE};
`;

export const ContractP = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	margin: 2%;
`;
export const ContractDiv = styled.div`
	& > p {
		font-size: ${MEDIUM_FONT_SIZE};
		margin-top: 2%;
		display: inline-block;
	}
	& > img {
		grid-row: span 2;
		height: 50px;
		width: 50px;
		border-radius: 100%;
		margin: 2%;
		display: inline-block;
	}
`;
export const ContractTitle = styled.p`
	margin: 3%;
	border-radius: ${props => props.theme.spacing(1)};
	padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(10)};
	border: 2px solid ${props => props.theme.colors.lightGray};
	font-size: ${LARGE_FONT_SIZE};
`;
