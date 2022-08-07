import { createSlice } from '@reduxjs/toolkit';

interface signInState {
  email: string,
  password: string
}

const initialState: signInState = {
  email: '',
  password: ''
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    email: (state, actions) => {
      state.email = actions.payload
    },
    password: (state, actions) => {
      state.password = actions.payload
    }
  }
});

export const { email, password } = signInSlice.actions;

export default signInSlice.reducer;