import styled from 'styled-components';

export const ContainerDate = styled.div`
	display: flex;
	& > div:last-child {
		margin-right: 0px;
	}
`;

export const DateBlock = styled.div`
	margin: 20px 20px 20px 0;
`;

export const ButtonBlock = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 20px;
	& > button:first-child {
		margin-right: 15px;
	}
`;

export const Title = styled.h2`
	display: flex;
	justify-content: center;
`;
