import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const pokemonApi = createApi({
	reducerPath: 'pokemonApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
	endpoints: (build) => ({
		getPokemonByName: build.query({
			query: () => `auth`,
		}),
	}),
});
export const { useGetPokemonByNameQuery } = pokemonApi;
