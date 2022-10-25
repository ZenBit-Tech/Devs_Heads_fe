import React from 'react';
import Popup from 'reactjs-popup';
import { t } from 'i18next';
import {
	Actions,
	BtnAccept,
	BtnDecline,
	Content,
	Div,
	P,
	Header,
	Modal,
	P2,
} from 'components/FreelancerOffer/FreeOfferPopup.styles';
import { useUpdateJobOfferMutation } from 'service/httpService';

interface IProps {
	open: boolean;
	offer: {
		name: string;
		price: number;
		startDate: string;
		endDate: string;
		jopPostId: number;
		freelancerId: number;
	};
	setOfferResponse: (response: string) => void;
	setStatus: (status: boolean) => void;
}

const FreelancerOfferPopup = (props: IProps) => {
	const { open, offer, setOfferResponse, setStatus } = props;
	const [updateOffer] = useUpdateJobOfferMutation();

	const handleClick = async (status: boolean) => {
		try {
			const { jopPostId, freelancerId } = offer;
			await updateOffer({ jobId: jopPostId, freelancerId, status }).unwrap();
			setStatus(status);
			if (status === true) {
				setOfferResponse(`${t('FreeOfferPopup.acceptMessage')}`);
			} else {
				setOfferResponse(`${t('FreeOfferPopup.declineMessage')}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Div>
			<Popup open={open} onClose={() => close()}>
				<Modal>
					<Header>{`${t('FreeOfferPopup.title')}`}</Header>
					<Content>
						<P>{`${t('FreeOfferPopup.company')}:`}</P>
						<P2>{offer?.name}</P2>
						<P>{`${t('FreeOfferPopup.price')}:`}</P>
						<P2>{offer?.price}</P2>
						<P>{`${t('FreeOfferPopup.start')}:`}</P>
						<P2>{offer?.startDate}</P2>
						<P>{`${t('FreeOfferPopup.end')}:`}</P>
						<P2>{offer?.endDate}</P2>
					</Content>
					<Actions>
						<BtnAccept type="button" onClick={() => handleClick(true)}>{`${t(
							'FreeOfferPopup.btnAccept',
						)}`}</BtnAccept>
						<BtnDecline type="button" onClick={() => handleClick(false)}>{`${t(
							'FreeOfferPopup.btnDecline',
						)}`}</BtnDecline>
					</Actions>
				</Modal>
			</Popup>
		</Div>
	);
};

export default FreelancerOfferPopup;
