import { IProfileEdit } from '../interfaces/interfaces';

interface ExperienceAndEducation {
	message: string;
	dateStart: Date;
	dateEnd: Date;
}
interface IDataToReceive {
	photo?: Blob;
	position: string;
	price: number;
	englishLevel: string;
	hour_rate: number;
	description: string;
	category: string;
	educations: ExperienceAndEducation[];
	experience: ExperienceAndEducation[];
	profileSkills: string[];
}

//We create an object to transform data from back end
/*TODO check object with backend*/
export const getDataEffect = () => {
	const getData = (data: IDataToReceive): IProfileEdit => {
		const newObj: IProfileEdit = {
			profilePhoto: data.photo,
			position: data.position,
			category: data.category,
			wage: data.price,
			skills: data.profileSkills.map(e => {
				return { label: e, value: false };
			}),
			englishLevel: data.englishLevel,
			description: data.description,
			education: data.educations.map(e => {
				return { dateEnd: e.dateEnd, dateStart: e.dateStart, info: e.message, error: false };
			}),
			experience: data.experience.map(e => {
				return { dateStart: e.dateStart, dateEnd: e.dateEnd, info: e.message, error: false };
			}),
		};
		console.log(newObj);
		return newObj;
	};
	return { getData };
};
