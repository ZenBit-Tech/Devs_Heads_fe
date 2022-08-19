import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
	}),
});
export const { useSignUpMutation } = authApi;
