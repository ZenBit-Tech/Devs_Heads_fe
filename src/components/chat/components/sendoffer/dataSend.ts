import { NotificationType, OfferForm } from './data';
import { notification } from 'antd';
import { usePostOfferMutation, useUpdateOfferStatusMutation } from 'service/httpService';

const error = 'error';
const success = 'success';
const someErrorOccurred = 'Some error occurred.';
const offerSent = 'Your offer has been sent successfully!';

export const useSendData = () => {
	const [sendForm] = usePostOfferMutation();
	const [updateOffer] = useUpdateOfferStatusMutation();
	const openNotificationWithIcon = (type: NotificationType) => {
		notification[type]({
			message: type === success ? success : error,
			description: type === success ? offerSent : someErrorOccurred,
		});
	};
	const sendData = async (data: OfferForm) => {
		try {
			const newObj: OfferForm = {
				name: data.name,
				price: data.price,
				startDate: data.startDate,
				endDate: data.endDate,
				freelancerId: data.freelancerId,
				clientId: data.clientId,
				jobPostId: data.jobPostId,
			};
			await sendForm(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (error) {
			openNotificationWithIcon('error');
		}
	};

	const sendUpdatedData = async (data: OfferForm) => {
		try {
			const newObj: OfferForm = {
				name: data.name,
				price: data.price,
				startDate: data.startDate,
				endDate: data.endDate,
				freelancerId: data.freelancerId,
				clientId: data.clientId,
				jobPostId: data.jobPostId,
			};
			await updateOffer(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (error) {
			openNotificationWithIcon('error');
		}
	};

	return { sendData, sendUpdatedData };
};
