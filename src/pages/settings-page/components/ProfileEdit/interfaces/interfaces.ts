export interface IEducationAndExperienceTemplate {
	info: string;
	dateStart: Date;
	dateEnd: Date;
	error: boolean;
}

export interface ITextareaWithDatesMainState {
	education: IEducationAndExperienceTemplate[];
	experience: IEducationAndExperienceTemplate[];
}

export type OnChangeObjectKeys = keyof ITextareaWithDatesMainState;

export interface ITextareaWithDatesOnChange {
	key: OnChangeObjectKeys;
	index: number;
	item: IEducationAndExperienceTemplate;
}
export interface ISkill {
	label: string;
	value: boolean;
}
export interface IProfileEdit {
	profilePhoto: string;
	position: string;
	category: string;
	wage: number;
	skills: ISkill[];
	englishLevel: EnglishLevelEnum;
	description: string;
	education: IEducationAndExperienceTemplate[];
	experience: IEducationAndExperienceTemplate[];
}
export enum EnglishLevelEnum {
	PRE_INTERMEDIATE = 'Pre_intermediate',
	INTERMEDIATE = 'Intermediate',
	UPPER_INTERMEDIATE = 'Upper_intermediate',
}

//Backend interfaces
interface IBackEndExperienceAndEducation {
	description: string;
	startDate: Date;
	endDate: Date;
}
interface IBackEndSkill {
	name: string;
}
interface IBackEndCategory {
	name: string;
}
export interface IBackEndProfileEdit {
	photo: string;
	position: string;
	englishLevel: EnglishLevelEnum;
	price: number;
	description: string;
	category: IBackEndCategory;
	education: IBackEndExperienceAndEducation[];
	experience: IBackEndExperienceAndEducation[];
	skills: IBackEndSkill[];
}
