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
import { useGetJobOfferQuery, useUpdateJobOfferMutation } from 'service/httpService';
import { notification } from 'antd';
import { Alert } from 'components/inviteTalent/interfaces';
import { ALERT_SUCCESS } from 'constants/links';

const FreelancerOfferPopup = () => {
	const { data: offer } = useGetJobOfferQuery({ id: 25, freelancerId: 1 });
	const [updateOffer] = useUpdateJobOfferMutation();
	const open = true;

	const alert = (type: Alert) => {
		notification[type]({
			message:
				type === ALERT_SUCCESS
					? `${t('FreeOfferPopup.acceptMessage')}`
					: `${t('FreeOfferPopup.declineMessage')}`,
		});
	};

	const handleClick = async (status: boolean) => {
		try {
			await updateOffer({ jobId: 25, freelancerId: 1, status }).unwrap();
			if (status === true) {
				alert('success');
			} else {
				alert('error');
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
