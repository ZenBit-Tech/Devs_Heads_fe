export interface ISignUpResponse {
	email: string;
	password: string;
	googleId: string;
	id: number;
	role?: string;
}

export interface ISignInResponse {
	access_token: string;
	userId: number;
	role: string;
}

export type FormPass = {
	password: string;
	token: string;
};

export type FormChangePasswordPass = {
	oldPassword: string;
	newPassword: string;
	email: string;
};

export interface IContactInfoForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	id?: number;
}

export type FormPassSingleProfile = {
	id: number;
	saved: boolean;
	clientId: number | undefined;
};

export type FormDataGoogle = {
	email: string;
	role?: string;
};

export interface ISignUpResponseGoogle {
	email: string;
	googleId?: string;
	id: number;
	role?: string;
}

export type FormData = {
	email: string;
	password: string;
	role?: string;
};
