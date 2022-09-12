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

export interface ICategory {
	value: string;
	label: string;
}
