import { t } from 'i18next';

export interface ISkill {
	name: string;
	value: boolean;
}

export interface IPost {
	id: number;
	jobTitle: string;
	jobDescription: string;
	jobCategory: { id: number; name: string };
	toHourRate: number;
	fromHourRate: number;
	jobSkills: { id: number; name: string }[];
	jobDuration: string;
}

export interface Category {
	value: string;
	label: string;
}

export const skillsMock = [
	{ name: 'Business analysis', value: false },
	{ name: 'Consulting', value: false },
	{ name: 'Estimate', value: false },
	{ name: 'Recruiting', value: false },
	{ name: 'SMM', value: false },
	{ name: 'Copyrighting', value: false },
	{ name: 'UI/UX', value: false },
	{ name: 'Administration', value: false },
	{ name: 'Taxation', value: false },
	{ name: 'Coaching', value: false },
	{ name: 'Full stack', value: false },
	{ name: 'Quality control', value: false },
	{ name: 'Communication', value: false },
	{ name: 'JavaScript', value: false },
	{ name: 'QA Automation', value: false },
	{ name: 'ReactJS', value: false },
	{ name: 'Python', value: false },
	{ name: 'Game dev', value: false },
	{ name: 'Flutter', value: false },
	{ name: 'Node.js', value: false },
	{ name: 'DevOps', value: false },
	{ name: 'Scrum Master', value: false },
	{ name: 'Agile Coach', value: false },
	{ name: 'Project Manager', value: false },
];

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
	`${t('JobPostPage.shortMonthDuration')}`,
	`${t('JobPostPage.mediumMonthDuration')}`,
	`${t('JobPostPage.longMonthDuration')}`,
];
