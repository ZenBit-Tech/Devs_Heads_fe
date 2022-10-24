import { notification } from 'antd';
import { t } from 'i18next';
import { useUpdateClientInfoMutation, usePostClientInfoMutation } from 'service/httpService';
import { Data, DataBE } from './data';

type NotificationType = 'success' | 'error';

export const useSendData = () => {
	const [sendClientInfo] = usePostClientInfoMutation();
	const [updateClientInfo] = useUpdateClientInfoMutation();
	const openNotificationWithIcon = (type: NotificationType) => {
		notification[type]({
			message: type === 'success' ? `${t('JobPostPage.success')}` : `${t('JobPostPage.error')}`,
			description:
				type === 'success'
					? `${t('JobPostPage.dataHasBeenSaved')}`
					: `${t('JobPostPage.someErrorOccurred')}`,
		});
	};

	const sendData = async (data: Data) => {
		try {
			const newObj: DataBE = {
				name: data.name,
				country: data.country.label,
				website: data.website,
				industry: data.industry?.value,
				quantity: data.quantity,
				description: data.description,
				userId: data.userId,
				photo: data.photo,
			};
			await sendClientInfo(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (error) {
			openNotificationWithIcon('error');
			// console.log(error);
		}
	};
	const sendUpdatedData = async (data: Data, ClientInfoId: number) => {
		try {
			const newObj: DataBE = {
				name: data.name,
				country: data.country.label,
				website: data.website,
				industry: data.industry?.value,
				quantity: data.quantity,
				description: data.description,
				userId: data.userId,
				photo: data.photo,
			};
			await updateClientInfo({ ClientInfoId, newObj }).unwrap();
			openNotificationWithIcon('success');
		} catch (error) {
			openNotificationWithIcon('error');
		}
	};
	return { sendData, sendUpdatedData };
};
