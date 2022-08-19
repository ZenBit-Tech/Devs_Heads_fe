import { createSlice } from '@reduxjs/toolkit';

interface ISampleState {
	value: number;
}

const initialState: ISampleState = {
	value: 50,
};

export const sampleSlice = createSlice({
	name: 'sample',
	initialState,
	reducers: {
		increment: state => {
			state.value += 10;
		},
		decrement: state => {
			state.value -= 10;
		},
	},
});

export const { increment, decrement } = sampleSlice.actions;

export default sampleSlice.reducer;
