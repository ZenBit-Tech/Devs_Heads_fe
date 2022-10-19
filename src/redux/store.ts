import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	authApi,
	clientSettingsApi,
	invitationPostApi,
	jobPostApi,
	profileApi,
	proposalPostApi,
	messagesApi,
} from 'service/httpService';
import sampleReducer from './reducers/sampleSlice';
import { userReducer } from './reducers/userSlice';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
	sample: sampleReducer,
	user: userReducer,
	[authApi.reducerPath]: authApi.reducer,
	[profileApi.reducerPath]: profileApi.reducer,
	[jobPostApi.reducerPath]: jobPostApi.reducer,
	[proposalPostApi.reducerPath]: proposalPostApi.reducer,
	[clientSettingsApi.reducerPath]: clientSettingsApi.reducer,
	[invitationPostApi.reducerPath]: invitationPostApi.reducer,
	[messagesApi.reducerPath]: messagesApi.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([
			authApi.middleware,
			profileApi.middleware,
			jobPostApi.middleware,
			proposalPostApi.middleware,
			clientSettingsApi.middleware,
			invitationPostApi.middleware,
			messagesApi.middleware,
		]),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
