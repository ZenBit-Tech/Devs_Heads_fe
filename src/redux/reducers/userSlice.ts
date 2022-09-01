import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISliceState {
	email: string;
	id: number | undefined;
	role?: 'freelancer' | 'client';
}

const initialState: ISliceState = {
	email: '',
	id: undefined,
	role: undefined,
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
		setUser: (state, action: PayloadAction<'freelancer' | 'client'>) => {
			state.role = action.payload;
		},
	},
});
export const { saveEmail, saveUserId, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
