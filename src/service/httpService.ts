import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormData } from 'components/signUp';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
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
	}),
});
export const { useSignUpMutation } = authApi;
