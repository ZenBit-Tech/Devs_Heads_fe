export interface ISkill {
	name: string;
	value: boolean;
}

export interface IPost {
	id: number;
	jobTitle: string;
	jobDescription: string;
	category: { id: number; name: string };
	toHourRate: number;
	fromHourRate: number;
	skills: { id: number; name: string }[];
	jobDuration: string;
	jobCategory: { id: number; name: string };
	jobSkills: { id: number; name: string }[];
}

export interface ICategory {
	value: string;
	label: string;
}
