import { configureStore } from '@reduxjs/toolkit';
import { authApi, profileApi } from 'service/httpService';
import { authSignIn } from 'service/signinHttp';
import sampleReducer from './reducers/sampleSlice';
import { userReducer } from './reducers/userSlice';

export const store = configureStore({
	reducer: {
		sample: sampleReducer,
		user: userReducer,
		[authSignIn.reducerPath]: authSignIn.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([authApi.middleware, profileApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
