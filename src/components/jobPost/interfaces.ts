export interface ISkill {
	name: string;
	value: boolean;
}
export interface IJobPost {
	title: string;
	category: string;
	duration: string;
	fromHourRate: number;
	toHourRate: number;
	description: string;
}

export type JobSubmitForm = {
	title: string;
	category: { label: string; value: string };
	fromHourRate: number;
	toHourRate: number;
	description: string;
	duration: string;
	skills: { name: string }[];
	userId: number | undefined;
};

export type EditJobSubmitForm = {
	jobTitle: string;
	fromHourRate: number;
	toHourRate: number;
	jobDuration: string;
	jobDescription: string;
};

interface ISkillBE {
	name: string;
}
interface ICategoryBE {
	name: string;
}

export interface IJobPostBE {
	jobTitle: string;
	jobCategory: ICategoryBE;
	jobDuration: string;
	fromHourRate: number;
	toHourRate: number;
	jobDescription: string;
	jobSkills: ISkillBE[];
	userId: number | undefined;
}
