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
				url: `auth/sign-up`,
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
			query: ({ id, saved, clientId }) => ({
				url: `profile/${id}`,
				method: 'put',
				body: { saved, clientId },
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
			invalidatesTags: ['Profile'],
		}),
		getTalentProfile: build.query({
			query: savedProfile => `/profile/${savedProfile.id}/savedTalent?page=${savedProfile.page}`,
			providesTags: ['Profile'],
		}),
		getUserProfile: build.query({
			query: profile => `/profile/${profile.id}/${profile.clientId}`,
			providesTags: ['Profile'],
		}),
		getFreelancerInfo: build.query({
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
	useGetFreelancerInfoQuery,
} = profileApi;

export const jobPostApi = createApi({
	reducerPath: 'jobPost',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['JobPost'],
	endpoints: build => ({
		getJobPosts: build.query({
			query: () => ({
				url: `/jobPost`,
			}),
			providesTags: ['JobPost'],
		}),
		getJobsDetail: build.query({
			query: id => `/jobPost/${id}`,
			providesTags: ['JobPost'],
		}),
		getPostJob: build.query({
			query: id => `/jobPost/user/${id}`,
			providesTags: ['JobPost'],
		}),
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
				clientId?: number;
				freelancerId?: number;
				profileId?: number;
				jobPostId?: number;
				jobTitle: string;
			},
			IMessage
		>({
			query: ({ message, clientId, freelancerId, profileId, jobPostId, jobTitle }) => ({
				url: '/invite-talent',
				method: 'POST',
				body: { message, clientId, freelancerId, profileId, jobPostId, jobTitle },
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
	}),
});

export const { usePostInvitationMutation } = invitationPostApi;

export const messagesApi = createApi({
	reducerPath: 'message',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['message'],
	endpoints: build => ({
		postMessage: build.mutation({
			query: body => ({
				url: '/message',
				method: 'POST',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		createRoom: build.mutation({
			query: body => ({
				url: '/chat-room',
				method: 'POST',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
		getMessagesByRoom: build.query({
			query: id => `/message/${id}`,
		}),
		getRoomsByUser: build.query({
			query: id => ({
				url: `/chat-room/${id}`,
				responseHandler: response => response.json(),
			}),
		}),
		getRoomsByTwoUsers: build.query({
			query: data => `/chat-room/${data.senderId}/${data.receiverId}/${data.jobPostId}`,
		}),
		updateChatRoom: build.mutation({
			query: data => ({
				url: `/chat-room/${data.chatRoomId}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['message'],
		}),
		updateDeletingStatus: build.mutation({
			query: data => ({
				url: `/chat-room/delete/${data.id}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['message'],
		}),
	}),
});

export const {
	usePostMessageMutation,
	useGetMessagesByRoomQuery,
	useCreateRoomMutation,
	useGetRoomsByUserQuery,
	useGetRoomsByTwoUsersQuery,
	useUpdateChatRoomMutation,
	useUpdateDeletingStatusMutation,
} = messagesApi;

export const JobOfferApi = createApi({
	reducerPath: 'jobOffer',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['jobOffer', 'jobContract'],
	endpoints: build => ({
		postOffer: build.mutation({
			query: body => ({
				url: '/jobOffer/offer',
				method: 'POST',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
			invalidatesTags: ['jobOffer'],
		}),
		updateOfferStatus: build.mutation({
			query: body => ({
				url: `/jobOffer/offer`,
				method: 'PUT',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
			invalidatesTags: ['jobOffer'],
		}),
		getJobOffer: build.query({
			query: currentChatId =>
				`/jobOffer/job/${currentChatId.jobPostId}/${currentChatId.freelancerId}/${currentChatId.clientId}`,
			providesTags: ['jobOffer'],
		}),
		getAcceptedJobOffer: build.query({
			query: sendData =>
				`/jobOffer/offer/${sendData.userId}/${sendData.role}?date=${sendData.date ?? ''}&status=${
					sendData.status ?? ''
				}`,
			providesTags: ['jobOffer'],
		}),
		updateOfferStatusExpired: build.mutation({
			query: ({ id, status }) => ({
				url: `/jobOffer`,
				method: 'PUT',
				body: { status, id },
			}),
			invalidatesTags: ['jobOffer'],
		}),
		updateJobOffer: build.mutation({
			query: ({ jobPostId, freelancerId, status, clientId }) => ({
				url: `/jobOffer/${jobPostId}/${freelancerId}/${clientId}`,
				method: 'PUT',
				body: { status },
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}),
		}),
	}),
});

export const {
	useGetJobOfferQuery,
	useUpdateOfferStatusMutation,
	useUpdateJobOfferMutation,
	useGetAcceptedJobOfferQuery,
	useUpdateOfferStatusExpiredMutation,
	usePostOfferMutation,
} = JobOfferApi;
