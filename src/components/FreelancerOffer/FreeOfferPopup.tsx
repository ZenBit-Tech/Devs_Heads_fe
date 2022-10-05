import React from 'react';
import Popup from 'reactjs-popup';
import { t } from 'i18next';

const FreelancerOfferPopup = () => {
	return (
		<div>
			<Popup onOpen={() => open()} onClose={() => close()}>
				<div>
					<header>{`${t('FreeOfferPopup.title')}`}</header>
					<div>{`${t('FreeOfferPopup.company')}`}</div>
					<div>{`${t('FreeOfferPopup.price')}`}</div>
					<div>{`${t('FreeOfferPopup.duration')}`}</div>
					<button type="button">{`${t('FreeOfferPopup.btnAccept')}`}</button>
					<button type="button">{`${t('FreeOfferPopup.btnDecline')}`}</button>
				</div>
			</Popup>
		</div>
	);
};

export default FreelancerOfferPopup;
