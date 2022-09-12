import { IBackEndProfileEdit, IProfileEdit } from '../interfaces/interfaces';

//We create an object to transform data from back end
/*TODO check object with backend*/
export const getDataEffect = () => {
	const getData = (data: IBackEndProfileEdit): IProfileEdit => {
		const newObj: IProfileEdit = {
			profilePhoto: data.photo,
			position: data.position,
			userId: data.userId,
			category: data.category.name,
			wage: data.price,
			skills: data.skills.map(e => {
				return { label: e.name, value: false };
			}),
			englishLevel: data.englishLevel,
			description: data.description,
			education: data.education.map(e => {
				return { dateEnd: e.endDate, dateStart: e.startDate, info: e.description, error: false };
			}),
			experience: data.experience.map(e => {
				return { dateStart: e.startDate, dateEnd: e.endDate, info: e.description, error: false };
			}),
		};
		console.log(newObj);
		return newObj;
	};
	return { getData };
};
