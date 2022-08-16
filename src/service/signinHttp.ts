import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authApi: any = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body) => ({
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

export const { useSignInMutation } = authApi;