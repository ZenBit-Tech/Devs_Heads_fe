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

const hardCode = {
	companyName: 'ZenBit',
	price: '$500',
	dateStart: '2022/10/15',
	dateEnd: '2023/01/20',
};

const FreelancerOfferPopup = () => {
	const open = true;
	return (
		<Div>
			<Popup open={open} onClose={() => close()}>
				<Modal>
					<Header>{`${t('FreeOfferPopup.title')}`}</Header>
					<Content>
						<P>{`${t('FreeOfferPopup.company')}:`}</P>
						<P2>{hardCode.companyName}</P2>
						<P>{`${t('FreeOfferPopup.price')}:`}</P>
						<P2>{hardCode.price}</P2>
						<P>{`${t('FreeOfferPopup.start')}:`}</P>
						<P2>{hardCode.dateStart}</P2>
						<P>{`${t('FreeOfferPopup.end')}:`}</P>
						<P2>{hardCode.dateEnd}</P2>
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
