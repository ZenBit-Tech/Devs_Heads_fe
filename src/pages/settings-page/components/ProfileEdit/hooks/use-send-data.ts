import { IProfileEdit } from '../interfaces/interfaces';
import { usePostProfileMutation } from 'service/httpService';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

interface ExperienceAndEducation {
	message: string;
	dateStart: Date;
	dateEnd: Date;
}
interface IDataToSend {
	photo?: Blob;
	position: string;
	price: number;
	englishLevel: string;
	hour_rate: number;
	description: string;
	category: string;
	educations: ExperienceAndEducation[];
	experience: ExperienceAndEducation[];
	profileSkills: string[];
}
type NotificationType = 'success' | 'error';

export const useSendData = () => {
	const { t } = useTranslation();
	const [sendProfile] = usePostProfileMutation();
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
			const newObj: IDataToSend = {
				position: data.position,
				price: data.wage,
				englishLevel: data.englishLevel,
				hour_rate: data.wage,
				description: data.description,
				category: data.category,
				profileSkills: data.skills.map(s => s.label),
				educations: data.education.map(e => {
					return {
						message: e.info,
						dateStart: e.dateStart,
						dateEnd: e.dateEnd,
					};
				}),
				experience: data.experience.map(e => {
					return {
						message: e.info,
						dateStart: e.dateStart,
						dateEnd: e.dateEnd,
					};
				}),
				photo: data.profilePhoto,
			};
			await sendProfile(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (e) {
			openNotificationWithIcon('error');
			console.log(e);
		}
	};
	return { sendData };
};
