import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
	Wrapper,
	StyledModal,
	CloseButton,
	Content,
	Backdrop,
} from 'components/PostDetailsPage/components/Modal.styles';
import { ContractDiv, ContractP, ContractTitle } from 'components/mycontract/MyContract.style';
import { IContract } from 'components/mycontract/interfaces';
import { getDate } from 'components/mycontract/dataUpdate';
import { t } from 'i18next';

interface ModalProps {
	isShown: boolean | undefined;
	item: IContract;
	setIsShown: (isShown: boolean) => void;
}
export const ContractModal = (props: ModalProps) => {
	const { setIsShown, isShown, item } = props;
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

	const modal = (
		<React.Fragment>
			<Backdrop />
			<Wrapper>
				<StyledModal ref={ref}>
					<CloseButton onClick={() => setIsShown(false)}>X</CloseButton>
					<ContractDiv>
						{item.clientId.clientSetting ? (
							<img src={item?.clientId.clientSetting.photo} />
						) : (
							<img src={item?.freelancerId.profileSetting?.photo} />
						)}
						{item.clientId.clientSetting ? (
							<ContractTitle>{item?.clientId.clientSetting.name}</ContractTitle>
						) : (
							<ContractTitle>
								{item?.freelancerId.firstName} {item?.freelancerId.lastName}
							</ContractTitle>
						)}
					</ContractDiv>
					<Content>
						<h3>{`${t('ContractSummary.title')}`}</h3>
						<ContractP>
							{`${t('ContractSummary.name')}`}
							{item?.jobPostId.jobTitle}
						</ContractP>
						<ContractP>
							{`${t('ContractSummary.price')}`}
							{item?.price}
						</ContractP>
						<ContractP>
							{`${t('ContractSummary.start')}`}
							{getDate(new Date(item.startDate))}
						</ContractP>
						<ContractP>
							{`${t('ContractSummary.end')}`}
							{getDate(new Date(item.endDate))}
						</ContractP>
						<ContractP>
							{`${t('ContractSummary.status')}`}
							{item?.status}
						</ContractP>
					</Content>
				</StyledModal>
			</Wrapper>
		</React.Fragment>
	);
	return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
export default ContractModal;
