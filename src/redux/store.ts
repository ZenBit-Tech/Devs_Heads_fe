import { configureStore } from '@reduxjs/toolkit';
import { authSignIn } from 'service/signinHttp';
import { authApi } from 'service/httpService';
import sampleReducer from './reducers/sampleSlice';

export const store = configureStore({
	reducer: {
		sample: sampleReducer,
		[authSignIn.reducerPath]: authSignIn.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
