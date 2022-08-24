import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IContactInfoForm } from '../pages/settings-page/components/ContactInfo/ContactInfo';
import { FormEmail } from 'components/forgotPassword/forgotPassword';

type FormData = {
	email: string;
	password: string;
};

const BASE_URL = 'http://localhost:3000';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: build => ({
		signUp: build.mutation<{ email: string; password: string }, FormData>({
			query: body => ({
				url: 'auth/sign-up',
				method: 'post',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		signIn: build.mutation<{ email: string; password: string }, FormData>({
			query: body => ({
				url: 'auth/sign-in',
				method: 'post',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		forgotPassword: build.mutation<{ email: string }, FormEmail>({
			query: body => ({
				url: 'auth/forgot-password',
				method: 'post',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
	}),
});
export const { useSignUpMutation, useSignInMutation, useForgotPasswordMutation } = authApi;

/*TODO when backend is ready*/
export const profileApi = createApi({
	reducerPath: 'profile',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: build => ({
		postProfileInfo: build.mutation<{ error: string }, IContactInfoForm>({
			query: body => ({
				url: '/contact-info',
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
