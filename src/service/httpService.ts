import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormEmail } from 'components/forgotPassword/forgotPassword';

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

type FormPass = {
	password: string;
	token: string;
};

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
		resetPassword: build.mutation<{ password: string }, FormPass>({
			query: body => ({
				url: 'auth/restore-password',
				method: 'post',
				body,
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
				},
			}),
		}),
		getUser: build.query({
			query: () => ({
				url: `auth/user`,
				responseHandler: response => response.json(),
			}),
		}),
	}),
});
export const {
	useSignUpMutation,
	useSignInMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useGetUserQuery,
} = authApi;

/*TODO when backend is ready*/
export const profileApi = createApi({
	reducerPath: 'profile',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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

export const jobPostApi = createApi({
	reducerPath: 'jobPost',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: build => ({
		postJob: build.mutation({
			query: body => ({
				url: '/jobPost',
				method: 'POST',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		getJobsDetail: build.query({
			query: id => `/jobPost/${id}`,
		}),
		getPostJob: build.query({
			query: id => `/jobPost/user/${id}`,
		}),
	}),
});

export const { usePostJobMutation, useGetJobsDetailQuery, useGetPostJobQuery } = jobPostApi;
