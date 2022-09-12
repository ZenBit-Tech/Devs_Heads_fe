export type SearchSubmitForm = {
	category: { label: string; value: string };
	search: string;
	skills: { name: string }[];
	userId: number | undefined;
};

export interface ICategoryBE {
	name: string;
}
interface ISkillBE {
	name: string;
}
export interface IJobPostBE {
	jobTitle: string;
	jobCategory: ICategoryBE;
	jobSkills: ISkillBE[];
	userId: number | undefined;
}

export interface FilterData {
	id: number;
	userName: string;
	profilePhoto: string;
	title: string;
	fromHourRate: number;
	toHourRate: number;
}

export interface Paginate {
	filterPerPage: number;
	total: number;
	paginate: (pageNumber: React.SetStateAction<number>) => void;
}

export interface ButtonActive {
	name: string;
	value: string;
}
