import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormEmail } from 'components/forgotPassword/forgotPassword';
import { IMessage } from 'components/inviteTalent/interfaces';
import {
	ISignUpResponse,
	ISignInResponse,
	FormPass,
	FormChangePasswordPass,
	IContactInfoForm,
	FormDataGoogle,
	ISignUpResponseGoogle,
	FormData,
	FormPassSingleProfile,
	IJobOffer,
	IUpdateOffer,
} from './interfaces';

const BASE_URL = `${process.env.REACT_APP_API_URL}`;
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
		signUpUpdate: build.mutation<ISignUpResponseGoogle, FormDataGoogle>({
			query: body => ({
				url: `auth/sign-up/update`,
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
		passwordChange: build.mutation<{ message?: string }, FormChangePasswordPass>({
			query: body => ({
				url: `auth/change-password`,
				method: 'put',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
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
	usePasswordChangeMutation,
	useGetUserQuery,
} = authApi;

/*TODO when backend is ready*/
export const profileApi = createApi({
	reducerPath: 'profile',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Profile'],
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
		getFilterProfile: build.query({
			query: filter => ({
				url: `profile/filter?category=${filter.select ?? ''}&sort=asc&skills=${
					filter.skills ?? ''
				}&search=${filter.search ?? ''}&page=${filter.page}`,
				method: 'get',
			}),
		}),
		updateSingleProfile: build.mutation<{ saved?: boolean }, FormPassSingleProfile>({
			query: ({ id, saved }) => ({
				url: `profile/${id}`,
				method: 'put',
				body: { saved },
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
			invalidatesTags: ['Profile'],
		}),
		getTalentProfile: build.query({
			query: page => `/profile/savedTalent?page=${page}`,
			providesTags: ['Profile'],
		}),
		getUserProfile: build.query({
			query: id => `/profile/${id}`,
			providesTags: ['Profile'],
		}),
	}),
});
export const {
	usePostProfileInfoMutation,
	usePostProfileMutation,
	useUpdateSingleProfileMutation,
	useGetFilterProfileQuery,
	useGetUserProfileQuery,
	useGetTalentProfileQuery,
} = profileApi;

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

export const clientSettingsApi = createApi({
	reducerPath: 'clientInfo',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['ClientInfo'],
	endpoints: build => ({
		postClientInfo: build.mutation({
			query: body => ({
				url: '/clientInfo',
				method: 'POST',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		getClientInfoByUser: build.query({
			query: id => `/clientInfo/user/${id}`,
		}),
		updateClientInfo: build.mutation({
			query: ({ ClientInfoId, newObj }) => ({
				url: `/clientInfo/${ClientInfoId}`,
				method: 'PATCH',
				body: newObj,
			}),
			invalidatesTags: ['ClientInfo'],
		}),
	}),
});

export const {
	useGetClientInfoByUserQuery,
	usePostClientInfoMutation,
	useUpdateClientInfoMutation,
} = clientSettingsApi;

export const invitationPostApi = createApi({
	reducerPath: 'invite-talent',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: build => ({
		postInvitation: build.mutation<
			{
				message: string;
				userId: number | undefined;
				profileId: number | undefined;
				jobTitle: string;
			},
			IMessage
		>({
			query: ({ message, userId, profileId, jobTitle }) => ({
				url: '/invite-talent',
				method: 'POST',
				body: { message, userId, profileId, jobTitle },
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
	}),
});

export const { usePostInvitationMutation } = invitationPostApi;

export const JobOfferApi = createApi({
	reducerPath: 'jobOffer',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: build => ({
		postJobOffer: build.mutation<
			{
				price: number;
				status: boolean;
				name: string;
				startDate: Date;
				endDate: Date;
				freenlancerId: number;
				jopPostId: number;
			},
			IJobOffer
		>({
			query: ({ price, status, name, startDate, endDate, freelancerId, jopPostId }) => ({
				url: '/jobOffer/offer',
				method: 'POST',
				body: { price, status, name, startDate, endDate, freelancerId, jopPostId },
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		getJobOffer: build.query({
			query: ({ id, freelancerId }) => `/jobOffer/job/${id}/${freelancerId}`,
		}),
		updateJobOffer: build.mutation<
			{ jobId: number; freelancerId: number; status: boolean },
			IUpdateOffer
		>({
			query: ({ jobId, freelancerId, status }) => ({
				url: `/jobOffer/${jobId}/${freelancerId}`,
				method: 'PUT',
				body: { status },
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
	}),
});

export const { usePostJobOfferMutation, useGetJobOfferQuery, useUpdateJobOfferMutation } =
	JobOfferApi;
