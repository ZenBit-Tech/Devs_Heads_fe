import { createSlice } from '@reduxjs/toolkit';

interface signUpState {
  email: string,
}

const initialState: signUpState = {
  email: '',
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    email: (state, actions) => {
      state.email = actions.payload
    }
  }
});

export const { email } = signUpSlice.actions;

export default signUpSlice.reducer;