import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDeleteJobPostMutation } from 'service/httpService';
import { Wrapper, Backdrop, StyledModal, Content } from './Modal.styles';
import { ButtonStyled, ModalWrapper, CloseButton } from './DeleteModal.styled';

interface DeleteModalProps {
	toggleModal: () => void;
	openModal: boolean;
	id: string | undefined;
}

const DeleteModal: FC<DeleteModalProps> = ({ toggleModal, openModal, id }) => {
	const [deleteJobPost, {}] = useDeleteJobPostMutation();
	const navigate = useNavigate();

	const handleRemove = () => {
		deleteJobPost(Number(id));
		navigate('/post-job');
	};
	const modal = (
		<>
			<Backdrop />
			<Wrapper>
				<StyledModal>
					<CloseButton onClick={toggleModal} />
					<Content>
						<ModalWrapper>
							<p>Are you sure, that you want to delete you post?</p>
							<div>
								<ButtonStyled onClick={handleRemove}>Yes</ButtonStyled>
								<ButtonStyled onClick={toggleModal}>No</ButtonStyled>
							</div>
						</ModalWrapper>
					</Content>
				</StyledModal>
			</Wrapper>
		</>
	);
	return openModal ? ReactDOM.createPortal(modal, document.body) : null;
};

export default DeleteModal;
