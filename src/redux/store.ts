import { configureStore } from '@reduxjs/toolkit';
import { authApi, profileApi } from 'service/httpService';
import sampleReducer from './reducers/sampleSlice';

export const store = configureStore({
	reducer: {
		sample: sampleReducer,
		[authApi.reducerPath]: authApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([authApi.middleware, profileApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
