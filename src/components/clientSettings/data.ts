import * as Yup from 'yup';
import { t } from 'i18next';

export const selection = [
	{ value: 'Legal', label: 'Legal' },
	{ value: 'IT', label: 'IT' },
	{ value: 'Sales', label: 'Sales' },
	{ value: 'Finance', label: 'Finance' },
	{ value: 'Construction', label: 'Construction' },
	{ value: 'Accounting', label: 'Accounting' },
	{ value: 'Design', label: 'Design' },
	{ value: 'Security', label: 'Security' },
	{ value: 'Healthcare', label: 'Healthcare' },
	{ value: 'Marketing', label: 'Marketing' },
];

export const checkList = [
	`${t('ClientSettings.people.me')}`,
	`${t('ClientSettings.people.2-9')}`,
	`${t('ClientSettings.people.10-99')}`,
	`${t('ClientSettings.people.100-1000')}`,
	`${t('ClientSettings.people.more')}`,
];

export interface ICategory {
	value: string;
	label: string;
}

export const ValidationSchema = Yup.object().shape({
	name: Yup.string()
		.required(`${t('JobPostPage.fieldIsRequired')}`)
		.min(6, `${t('JobPostPage.minLength')}`)
		.max(100, `${t('JobPostPage.maxLength100')}`),
	country: Yup.object().shape({
		label: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
		value: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
	}),
	description: Yup.string().max(160, `${t('JobPostPage.maxLength100')}`),
});

export type DataSchema = {
	name: string;
	country: { label: string; value: string };
	description: string;
	userId: number;
	quantity: string | null;
	website?: string;
};

export type Data = {
	name: string;
	country: ICountry;
	website?: string;
	industry?: ICountry;
	quantity: string | null;
	description?: string;
	userId: number | undefined;
};

export type DataBE = {
	name: string;
	country: string;
	website?: string;
	industry?: string;
	quantity: string | null;
	description?: string;
	userId: number | undefined;
};

export interface ICountry {
	value: string;
	label: string;
}

export const initialCountry = {
	value: '',
	label: '',
};

export const settings = 'settings';
export const password = 'password';
