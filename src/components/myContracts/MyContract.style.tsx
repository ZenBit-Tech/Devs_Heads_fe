import styled from 'styled-components';

export const SelectBlock = styled.div`
	display: flex;
	justify-content: flex-start;
`;

export const Wrapper = styled.div`
	margin: ${props => props.theme.spacing(5)};
	padding: ${props => props.theme.spacing(5)};
	border-radius: ${props => props.theme.spacing(5)};
	width: 1000px;
`;

export const Div = styled.div`
	margin: ${props => props.theme.spacing(5)};
	width: 200px;
`;
