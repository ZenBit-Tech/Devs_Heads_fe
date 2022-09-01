import { configureStore } from '@reduxjs/toolkit';
import { authApi, jobPostApi, profileApi, proposalPostApi } from 'service/httpService';
import sampleReducer from './reducers/sampleSlice';
import { userReducer } from './reducers/userSlice';

export const store = configureStore({
	reducer: {
		sample: sampleReducer,
		user: userReducer,
		[authApi.reducerPath]: authApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[jobPostApi.reducerPath]: jobPostApi.reducer,
		[proposalPostApi.reducerPath]: proposalPostApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			authApi.middleware,
			profileApi.middleware,
			jobPostApi.middleware,
			proposalPostApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
