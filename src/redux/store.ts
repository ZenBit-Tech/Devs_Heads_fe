import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'service/signinHttp';
import sampleReducer from './reducers/sampleSlice';

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
