export interface ISkill {
	label: string;
	value: boolean;
}
export interface IJobPost {
	title: string;
	category: string;
	skills: ISkill[];
	duration: string;
	from_hour_rate: number;
	to_hour_rate: number;
	description: string;
}
