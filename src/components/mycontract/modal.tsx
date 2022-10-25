import React from 'react';
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
	isShown: boolean;
	hide: () => void;
	item: IContract;
}
export const ContractModal = (props: ModalProps) => {
	const { hide, isShown, item } = props;
	const modal = (
		<React.Fragment>
			<Backdrop />
			<Wrapper>
				<StyledModal>
					<CloseButton onClick={hide}>X</CloseButton>
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
