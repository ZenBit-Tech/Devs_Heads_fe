export interface JobSkills {
	id: number;
	name: string;
}

export type ProposalSubmitForm = {
	userId: number;
	jobPost: number;
	price: number;
	message: string;
};
