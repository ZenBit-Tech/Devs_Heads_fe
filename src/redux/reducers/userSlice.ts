import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISliceState {
	email: string;
	password: string;
	id: number | undefined;
	role: string;
	access_token: string;
}

const initialState: ISliceState = {
	email: '',
	password: '',
	id: undefined,
	role: '',
	access_token: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		saveEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		savePassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		saveUserId: (state, action: PayloadAction<number | undefined>) => {
			state.id = action.payload;
		},
		saveToken: (state, action: PayloadAction<string>) => {
			state.access_token = action.payload;
		},
		saveRole: (state, action: PayloadAction<string>) => {
			state.role = action.payload;
		},
	},
});

export const { saveEmail, saveUserId, saveToken, saveRole, savePassword } = userSlice.actions;
export const userReducer = userSlice.reducer;
