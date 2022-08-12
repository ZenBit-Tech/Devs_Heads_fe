import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './reducers/sampleSlice';
import { pokemonApi } from '../components/GoogleAuth/GoogleAuth';

export const store = configureStore({
	reducer: {
		[pokemonApi.reducerPath]: pokemonApi.reducer,
		sample: sampleReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
