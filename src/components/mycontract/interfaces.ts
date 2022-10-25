export interface IContract {
	id: number;
	name: string;
	status: string;
	startDate: string;
	endDate: string;
	price: string;
	freelancerId: {
		profileSetting: {
			photo: string;
		};
		firstName: string;
		lastName: string;
	};
	jobPostId: {
		jobTitle: string;
	};
	clientId: {
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
		profileSetting: {
			photo: '',
		},
		firstName: '',
		lastName: '',
	},
	jobPostId: {
		jobTitle: '',
	},
	clientId: {
		clientSetting: {
			photo: '',
			name: '',
		},
	},
};
