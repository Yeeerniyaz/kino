import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCarousel = createAsyncThunk('carousel/getCarousel', async () => {
	const headers = {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzcC5raW5vcGFyayIsInN1YiI6ImZyb250LnByb2QiLCJuYW1lIjoibWVkaWEtYXBpLnByb2QifQ.FIRt0HLyMTPbLa0dOhp7Tu8cHxd65JDbWr7-lI948NQ`,
	};
	const { data } = await axios.get('https://media.api.kinopark.kz/api/slider?per_page=100&sort=sort_order:asc', {
		headers,
	});
	return data;
});

const initialState = {
	data: [],
	loading: true,
	error: null,
};

const carouselSlice = createSlice({
	name: 'carousel',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCarousel.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getCarousel.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(getCarousel.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export const carouselReducer = carouselSlice.reducer;
