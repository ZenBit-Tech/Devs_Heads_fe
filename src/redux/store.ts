import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './reducers/sampleSlice';
import signInReducer from './reducers/signin';

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
    signIn: signInReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
