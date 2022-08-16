import { IProfileEdit } from '../interfaces/interfaces';

interface ExperienceAndEducation {
	message: string;
	dateStart: Date;
	dateEnd: Date;
}
interface IDataToSend {
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

export const useSendData = () => {
	//We create an object for back end
	/*TODO check object with backend*/
	const sendData = (data: IProfileEdit): IDataToSend => {
		const newObj = {
			position: data.position,
			price: data.wage,
			englishLevel: data.englishLevel,
			hour_rate: data.wage,
			description: data.description,
			category: data.category,
			profileSkills: data.skills.map(s => s.label),
			educations: data.education.map(e => {
				return {
					message: e.info,
					dateStart: e.dateStart,
					dateEnd: e.dateEnd,
				};
			}),
			experience: data.experience.map(e => {
				return {
					message: e.info,
					dateStart: e.dateStart,
					dateEnd: e.dateEnd,
				};
			}),
			photo: data.profilePhoto,
		};
		console.log(newObj);
		return newObj;
	};
	return { sendData };
};
