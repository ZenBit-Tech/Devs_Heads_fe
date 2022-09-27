import { IBackEndProfileEdit, IProfileEdit } from '../interfaces/interfaces';
import { usePostProfileMutation } from 'service/httpService';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

type NotificationType = 'success' | 'error';

export const useSendData = () => {
	const { t } = useTranslation();
	const [sendProfile] = usePostProfileMutation();
	const { user } = useAppSelector<RootState>(state => state);
	const openNotificationWithIcon = (type: NotificationType) => {
		notification[type]({
			message: type === 'success' ? `${t('ContactInfo.success')}` : `${t('ContactInfo.error')}`,
			description:
				type === 'success'
					? `${t('ContactInfo.dataHasBeenSaved')}`
					: `${t('ContactInfo.someErrorOccurred')}`,
		});
	};

	//We create an object for back end
	/*TODO check object with backend*/
	const sendData = async (data: IProfileEdit) => {
		try {
			const newObj: IBackEndProfileEdit = {
				position: data.position,
				price: data.wage,
				englishLevel: data.englishLevel,
				description: data.description,
				userId: user.id,
				category: { name: data.category },
				skills: data.skills.map(s => {
					return { name: s.label };
				}),
				education: data.education.map(e => {
					return {
						description: e.info,
						startDate: e.dateStart,
						endDate: e.dateEnd,
					};
				}),
				experience: data.experience.map(e => {
					return {
						description: e.info,
						startDate: e.dateStart,
						endDate: e.dateEnd,
					};
				}),
				photo: data.profilePhoto,
			};
			await sendProfile(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (e) {
			openNotificationWithIcon('error');
			// console.log(e);
		}
	};
	return { sendData };
};
