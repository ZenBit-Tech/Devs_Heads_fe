import { t } from 'i18next';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
	title: Yup.string()
		.required(`${t('JobPostPage.fieldIsRequired')}`)
		.min(6, `${t('JobPostPage.minLength')}`)
		.max(100, `${t('JobPostPage.maxLength100')}`),
	category: Yup.object().shape({
		label: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
		value: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
	}),
	description: Yup.string()
		.required(`${t('JobPostPage.fieldIsRequired')}`)
		.min(6, `${t('JobPostPage.minLength')}`)
		.max(5000, `${t('JobPostPage.maxLength5000')}`),
	fromHourRate: Yup.number().required().positive(),
	toHourRate: Yup.number().required().positive(),
	duration: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
});

export default ValidationSchema;
