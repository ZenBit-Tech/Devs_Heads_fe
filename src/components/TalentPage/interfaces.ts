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

interface ISkill {
	id: number;
	name: string;
}

interface ICategory {
	id: number;
	name: string;
}
export interface FilterData {
	category: ICategory;
	description: string;
	englishLevel: string;
	id: number;
	photo: string;
	position: string;
	price: number;
	skills: ISkill[];
	userId: number;
}
export interface UserProfile {
	email: string;
	firstName: string;
	id: number;
	lastName: string;
	phone: string;
	user: number;
	userId: number;
}

export interface Filter {
	[map: string]: any;
	filter: FilterData;
	user: UserProfile;
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
