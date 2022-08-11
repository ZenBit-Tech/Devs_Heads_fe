import { createSlice } from '@reduxjs/toolkit';

interface signInState {
  email: string,
}

const initialState: signInState = {
  email: '',
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    email: (state, actions) => {
      state.email = actions.payload
    }
  }
});

export const { email } = signInSlice.actions;

export default signInSlice.reducer;