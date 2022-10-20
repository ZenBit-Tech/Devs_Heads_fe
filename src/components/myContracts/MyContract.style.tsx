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
	font-size: 20px;
`;
export const MainWrapper = styled.div`
	margin: ${props => props.theme.spacing(5)} auto;
	padding: ${props => props.theme.spacing(5)};
	border-radius: ${props => props.theme.spacing(5)};
	width: ${props => props.theme.spacing(250)};
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
`;
export const ContractItem = styled.div`
	display: flex;
	align-items: center;
	padding: ${props => props.theme.spacing(5)};
`;

export const P = styled.p`
	font-size: ${MEDIUM_FONT_SIZE};
	padding: ${props => props.theme.spacing(5)} ${props => props.theme.spacing(5)} 0
		${props => props.theme.spacing(5)};
	align-items: center;
`;

export const NotFoundContract = styled.div`
	display: flex;
	margin: ${props => props.theme.spacing(12.5)};
	font-size: ${LARGE_FONT_SIZE};
`;
