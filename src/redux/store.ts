import { configureStore } from '@reduxjs/toolkit';
import { authSignIn } from 'service/signinHttp';
import { authApi } from 'service/httpService';
import sampleReducer from './reducers/sampleSlice';

export const store = configureStore({
	reducer: {
		sample: sampleReducer,
		[authApi.reducerPath]: authApi.reducer,
		[authSignIn.reducerPath]: authSignIn.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
