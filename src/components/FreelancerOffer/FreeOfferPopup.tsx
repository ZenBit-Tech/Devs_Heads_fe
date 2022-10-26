import React from 'react';
import { t } from 'i18next';
import {
	Actions,
	BtnAccept,
	BtnDecline,
	Content,
	P,
	Header,
	Modal,
	P2,
} from 'components/FreelancerOffer/FreeOfferPopup.styles';
import { useUpdateJobOfferMutation } from 'service/httpService';

interface IProps {
	offer: [
		{
			name: string;
			price: number;
			startDate: string;
			endDate: string;
			jobPostId: number;
			freelancerId: number;
			clientId: number;
		},
	];
	setOfferResponse: (response: string) => void;
	setStatus: (status: boolean) => void;
}

const FreelancerOfferPopup = (props: IProps) => {
	const { offer, setOfferResponse, setStatus } = props;
	const [updateOffer] = useUpdateJobOfferMutation();
	const Accepted = 'Accepted';

	const handleClick = async (status: string) => {
		try {
			const obj = {
				jobPostId: offer?.map(el => el.jobPostId),
				freelancerId: offer?.map(el => el.freelancerId),
				clientId: offer?.map(el => el.clientId),
			};
			const { jobPostId, freelancerId, clientId } = obj;
			await updateOffer({ jobPostId, freelancerId, clientId, status }).unwrap();
			if (status === Accepted) {
				setStatus(true);
				setOfferResponse(`${t('FreeOfferPopup.acceptMessage')}`);
			} else {
				setStatus(false);
				setOfferResponse(`${t('FreeOfferPopup.declineMessage')}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<Modal>
				<Header>{`${t('FreeOfferPopup.title')}`}</Header>
				{offer?.map(el => (
					<Content>
						<P>{`${t('FreeOfferPopup.company')}:`}</P>
						<P2>{el.name}</P2>
						<P>{`${t('FreeOfferPopup.price')}:`}</P>
						<P2>{el.price}</P2>
						<P>{`${t('FreeOfferPopup.start')}:`}</P>
						<P2>{el.startDate}</P2>
						<P>{`${t('FreeOfferPopup.end')}:`}</P>
						<P2>{el.endDate}</P2>
					</Content>
				))}
				<Actions>
					<BtnAccept type="button" onClick={() => handleClick('Accepted')}>{`${t(
						'FreeOfferPopup.btnAccept',
					)}`}</BtnAccept>
					<BtnDecline type="button" onClick={() => handleClick('Rejected')}>{`${t(
						'FreeOfferPopup.btnDecline',
					)}`}</BtnDecline>
				</Actions>
			</Modal>
		</div>
	);
};

export default FreelancerOfferPopup;
