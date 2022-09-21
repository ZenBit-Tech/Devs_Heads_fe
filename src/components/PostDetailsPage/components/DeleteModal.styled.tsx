import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const ButtonStyled = styled.button`
	padding: ${props => props.theme.spacing(3)};
	background: ${props => props.theme.colors.transparentGrey};
	border-radius: ${props => props.theme.spacing(2)};
	width: ${props => props.theme.spacing(38)};
	color: ${props => props.theme.colors.white};
	transition: transform 300ms linear;
	&:not(:last-child) {
		margin-right: ${props => props.theme.spacing(3)};
	}
	&:hover {
		transform: translateY(-${props => props.theme.spacing(2)});
	}
`;

export const ModalWrapper = styled.div`
	text-align: center;
`;

export const CloseButton = styled(CloseOutlined)`
	position: absolute;
	top: ${props => props.theme.spacing(2)};
	right: ${props => props.theme.spacing(2)};
`;
