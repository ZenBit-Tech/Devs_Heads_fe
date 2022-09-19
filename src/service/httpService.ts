import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormEmail } from 'components/forgotPassword/forgotPassword';

type FormData = {
	email: string;
	password?: string;
	role?: string;
};

interface ISignUpResponse {
	email: string;
	password: string;
	googleId: string;
	id: number;
	role?: string;
}

interface ISignInResponse {
	access_token: string;
	userId: number;
	role: string;
}

type FormPass = {
	password: string;
	token: string;
};

interface IContactInfoForm {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	id: number | undefined;
}

const BASE_URL = 'http://localhost:3000';
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
		signUpUpdate: build.mutation<ISignUpResponse, FormData>({
			query: body => ({
				url: `auth/sign-up/`,
				method: 'put',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		signIn: build.mutation<ISignInResponse, FormData>({
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
	useSignUpUpdateMutation,
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
	tagTypes: ['JobPost'],
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
			invalidatesTags: ['JobPost'],
		}),
		getJobPosts: build.query({
			query: () => ({
				url: `/jobPost`,
			}),
			providesTags: ['JobPost'],
		}),
		getJobsDetail: build.query({
			query: id => `/jobPost/${id}`,
		}),
		getPostJob: build.query({
			query: id => `/jobPost/user/${id}`,
		}),
		updateJobPost: build.mutation({
			query: ({ data, postId }) => ({
				url: `/jobPost/${postId}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['JobPost'],
		}),
		deleteJobPost: build.mutation({
			query: id => ({
				url: `/jobPost/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['JobPost'],
		}),
	}),
});

export const {
	usePostJobMutation,
	useGetJobsDetailQuery,
	useGetPostJobQuery,
	useGetJobPostsQuery,
	useDeleteJobPostMutation,
	useUpdateJobPostMutation,
} = jobPostApi;

export const proposalPostApi = createApi({
	reducerPath: 'jobProposal',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: build => ({
		postProposal: build.mutation({
			query: body => ({
				url: '/jobProposal',
				method: 'POST',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		getProposalDetail: build.query({
			query: proposalId => `/jobProposal/proposal/${proposalId.userId}/${proposalId.jobId}`,
		}),
	}),
});

export const { usePostProposalMutation, useGetProposalDetailQuery } = proposalPostApi;
