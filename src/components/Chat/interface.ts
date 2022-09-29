export interface IMessages {
	id: number;
	userId?: number;
	name?: string;
	linkJob: string;
	email: string;
	text: string;
	created_at: string;
}

export interface IUser {
	access_token: string;
	email: string;
	id: number;
	password: string;
	role: string;
}
