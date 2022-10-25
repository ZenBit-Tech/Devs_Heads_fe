export interface IContract {
	id: number;
	name: string;
	status: string;
	startDate: string;
	endDate: string;
	freelancerId: {
		photo: string;
		userId: {
			firstName: string;
			lastName: string;
		};
	};
	jobPostId: {
		jobTitle: string;
		userId: {
			clientSetting: {
				photo: string;
			};
		};
	};
	clientId: {
		photo: string;
	};
}
export interface ISelect {
	name: string;
}
