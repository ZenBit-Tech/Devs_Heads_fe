import React, { useEffect, useRef } from 'react';
import {
	Wrapper,
	StyledModal,
	CloseButton,
	Content,
	Backdrop,
} from 'components/PostDetailsPage/components/Modal.styles';
import { t } from 'i18next';
import { ModalBlock, SubTitle, TitleDelete } from './MyContract.style';
import { Cancel, Button } from 'pages/setting-page-client/change-password/ChangePassword.styles';
import { ButtonBlock } from 'components/chat/components/sendoffer/SendOffer.style';
import { useUpdateJobOfferMutation } from 'service/httpService';
import { IContract } from './interfaces';

interface ModalProps {
	isShown: boolean | undefined;
	setIsShown: (isShown: boolean) => void;
	item: IContract;
}

export const ContractModal = (props: ModalProps) => {
	const { isShown, setIsShown, item } = props;
	const [updateStatus] = useUpdateJobOfferMutation();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: { target: any }) {
			const target = event.target as HTMLDivElement;
			if (ref.current && !ref.current.contains(target)) {
				setIsShown(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);

	function deleteContract(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.stopPropagation();
		const updateContractStatus = async () => {
			await updateStatus({
				jobId: item.jobPostId.id,
				freelancerId: item.freelancerId.id,
				status: 'Deleted',
				clientId: item.clientId,
			});
			setIsShown(false);
		};
		updateContractStatus();
	}

	function cancelContract(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.stopPropagation();
		setIsShown(false);
	}
	const modal = (
		<React.Fragment>
			{isShown && (
				<>
					<Backdrop />
					<Wrapper>
						<StyledModal>
							<ModalBlock ref={ref}>
								<CloseButton>X</CloseButton>
								<Content>
									<TitleDelete>{`${t('DeleteSummary.title')}`}</TitleDelete>
									<SubTitle>{`${t('DeleteSummary.description')}`}</SubTitle>
								</Content>
								<ButtonBlock>
									<Cancel onClick={e => cancelContract(e)}>{`${t('DeleteSummary.cancel')}`}</Cancel>{' '}
									<Button onClick={e => deleteContract(e)}>{`${t('DeleteSummary.delete')}`}</Button>
								</ButtonBlock>
							</ModalBlock>
						</StyledModal>
					</Wrapper>
				</>
			)}
		</React.Fragment>
	);
	return modal;
};
export default ContractModal;
