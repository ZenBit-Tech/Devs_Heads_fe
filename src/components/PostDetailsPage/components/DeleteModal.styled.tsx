import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const ButtonStyled = styled.button`
	padding: 12px;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 8px;
	width: 150px;
	color: ${props => props.theme.colors.white};
	transition: transform 300ms linear;
	&:not(:last-child) {
		margin-right: 12px;
	}
	&:hover {
		transform: translateY(-8px);
	}
`;

export const ModalWrapper = styled.div`
	text-align: center;
`;

export const CloseButton = styled(CloseOutlined)`
	position: absolute;
	top: 8px;
	right: 8px;
`;
