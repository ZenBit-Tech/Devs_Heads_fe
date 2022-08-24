import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type FormData = {
	email: string;
	password: string;
};
interface ISignUpResponse {
	email: string;
	password: string;
	googleId: string;
	id: number;
}

const BASE_URL = 'http://localhost:3000';
interface IContactInfoForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	id: number | undefined;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: build => ({
		signUp: build.mutation<ISignUpResponse, FormData>({
			query: body => ({
				url: 'auth/sign-up',
				method: 'post',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
	}),
});
export const { useSignUpMutation } = authApi;

/*TODO when backend is ready*/
export const profileApi = createApi({
	reducerPath: 'profile',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	endpoints: build => ({
		postProfileInfo: build.mutation<IContactInfoForm, IContactInfoForm>({
			query: ({ id, email, firstName, lastName, phone }) => ({
				url: `/contact-info/${id}`,
				method: 'post',
				body: { email, firstName, lastName, phone },
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		postProfile: build.mutation({
			query: body => ({
				url: '/profile',
				method: 'post',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
	}),
});
export const { usePostProfileInfoMutation, usePostProfileMutation } = profileApi;
