import React from 'react';
import styled from 'styled-components';
import googleIcon from '../../assets/googleIcon.png';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	margin-top: 100px;
	width: 220px;
	height: 50px;
	background: dodgerblue;
	padding: 2px;
	border-radius: 5px;

	&:hover {
		background: #45a2ff;
	}
`;
const Image = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 5px;
`;
const Typography = styled.div`
	color: white;
	width: 70%;
	font-family: Roboto, sans-serif;
	margin: auto;
	font-weight: 400;
	font-size: 16px;
`;

function GoogleAuth() {
	const googleAuth = () => {
		window.open('http://localhost:5000/auth/redirect', '_self');
	};
	return (
		<Container onClick={googleAuth}>
			<Image src={googleIcon} />
			<Typography>Sign up with Google</Typography>
		</Container>
	);
}

export default GoogleAuth;
