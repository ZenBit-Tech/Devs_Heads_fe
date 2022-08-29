import { notification } from 'antd';
import { t } from 'i18next';
import { usePostJobMutation } from 'service/httpService';
import { IJobPostBE, JobSubmitForm } from 'components/jobPost/interfaces';

type NotificationType = 'success' | 'error';

export const useSendData = () => {
	const [sendJobPost] = usePostJobMutation();
	const openNotificationWithIcon = (type: NotificationType) => {
		notification[type]({
			message: type === 'success' ? `${t('JobPostPage.success')}` : `${t('JobPostPage.error')}`,
			description:
				type === 'success'
					? `${t('JobPostPage.dataHasBeenSaved')}`
					: `${t('JobPostPage.someErrorOccurred')}`,
		});
	};

	const sendData = async (data: JobSubmitForm) => {
		try {
			const newObj: IJobPostBE = {
				jobTitle: data.title,
				jobCategory: { name: data.category.label },
				jobDuration: data.duration,
				fromHourRate: data.fromHourRate,
				toHourRate: data.toHourRate,
				jobDescription: data.description,
				jobSkills: data.skills,
			};
			await sendJobPost(newObj).unwrap();
			openNotificationWithIcon('success');
		} catch (error) {
			openNotificationWithIcon('error');
			console.log(error);
		}
	};
	return { sendData };
};
