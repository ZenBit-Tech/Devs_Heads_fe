import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IContactInfoForm } from '../pages/settings-page/components/ContactInfo/ContactInfo';

// Define a service using a base URL and expected endpoints
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	endpoints: build => ({
		signUp: build.mutation({
			query: body => ({
				url: 'auth/sign-up',
				method: 'post',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
			transformResponse: (response: { data: { email: string } }, meta, arg) => response.data,
		}),
	}),
});
export const { useSignUpMutation } = authApi;

/*TODO when backend is ready*/
export const profileApi = createApi({
	reducerPath: 'profile',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/profile' }),
	endpoints: build => ({
		postProfileInfo: build.mutation<{ error: string }, IContactInfoForm>({
			query: body => ({
				url: '/info',
				method: 'post',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
			//transformResponse: (response: { error: string }, meta, arg) => response,
		}),
		postProfile: build.mutation({
			query: body => ({
				url: '/',
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
