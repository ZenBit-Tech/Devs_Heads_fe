import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './reducers/sampleSlice';
import signUpReducer from './reducers/signUp';

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
    signUp: signUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
