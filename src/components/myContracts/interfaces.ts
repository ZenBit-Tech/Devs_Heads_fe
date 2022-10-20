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
	jobPost: {
		jobTitle: string;
	};
}
export interface ISelect {
	name: string;
}
