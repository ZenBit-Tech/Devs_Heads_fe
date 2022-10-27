export interface IContract {
	id: number;
	name: string;
	status: string;
	startDate: string;
	endDate: string;
	price: string;
	freelancerId: {
		id: number;
		profileSetting: {
			photo: string;
		};
		firstName: string;
		lastName: string;
	};
	jobPostId: {
		id: number;
		jobTitle: string;
	};
	clientId: {
		id: number;
		clientSetting: {
			photo: string;
			name: string;
		};
	};
}
export interface ISelect {
	name: string;
}
export const initialContract = {
	id: 0,
	name: '',
	status: '',
	startDate: '',
	endDate: '',
	price: '',
	freelancerId: {
		id: 0,
		profileSetting: {
			photo: '',
		},
		firstName: '',
		lastName: '',
	},
	jobPostId: {
		id: 0,
		jobTitle: '',
	},
	clientId: {
		id: 0,
		clientSetting: {
			photo: '',
			name: '',
		},
	},
};
