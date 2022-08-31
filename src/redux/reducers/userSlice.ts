import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISliceState {
	email: string;
	id: number | undefined;
}

const initialState: ISliceState = {
	email: '',
	id: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		saveEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		saveUserId: (state, action: PayloadAction<number>) => {
			state.id = action.payload;
		},
	},
});

export const { saveEmail, saveUserId } = userSlice.actions;
export const userReducer = userSlice.reducer;
