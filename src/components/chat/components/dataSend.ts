import { NotificationType, OfferForm, Schema } from './data';
import { notification } from 'antd';
import { usePostOfferMutation } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const error = 'error';
const success = 'success';
const someErrorOccurred = 'Some error occurred.';
const offerSent = 'Your offer has been sent successfully!';

export const useSendData = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const [sendForm] = usePostOfferMutation();
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
				clientId: user.id,
				jopPostId: data.jopPostId,
			};
			await sendForm(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (error) {
			openNotificationWithIcon('error');
		}
	};

	return { sendData };
};
