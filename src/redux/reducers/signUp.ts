import { createSlice } from '@reduxjs/toolkit';

interface signUpState {
  email: string,
  password: string
}

const initialState: signUpState = {
  email: '',
  password: ''
};

export const signUpSlice = createSlice({
  name: 'signUp',
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

export const { email, password } = signUpSlice.actions;

export default signUpSlice.reducer;