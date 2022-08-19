import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormData } from 'components/signIn/Signin';

const BASE_URL = 'http://localhost:3000';

export const authSignIn = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: build => ({
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
	}),
});

export const { useSignInMutation } = authSignIn;
