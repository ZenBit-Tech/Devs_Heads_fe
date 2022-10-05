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
} from 'components/FreelancerOffer/FreeOfferPopup.styles';

const FreelancerOfferPopup = () => {
	const open = true;
	return (
		<Div>
			<Popup open={open} onClose={() => close()}>
				<Modal>
					<Header>{`${t('FreeOfferPopup.title')}`}</Header>
					<Content>
						<P>{`${t('FreeOfferPopup.company')}:`}</P>
						<P>{`${t('FreeOfferPopup.price')}:`}</P>
						<P>{`${t('FreeOfferPopup.start')}:`}</P>
						<P>{`${t('FreeOfferPopup.end')}:`}</P>
					</Content>
					<Actions>
						<BtnAccept type="button">{`${t('FreeOfferPopup.btnAccept')}`}</BtnAccept>
						<BtnDecline type="button">{`${t('FreeOfferPopup.btnDecline')}`}</BtnDecline>
					</Actions>
				</Modal>
			</Popup>
		</Div>
	);
};

export default FreelancerOfferPopup;
