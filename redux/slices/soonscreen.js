import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';
import axios from '../../axios';

export const fetchSoonScreen = createAsyncThunk('soonScreen/fetchSoonScreen', async () => {
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);
	const year = tomorrow.getFullYear();
	const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
	const day = String(tomorrow.getDate()).padStart(2, '0');
	const formattedTomorrow = `${year}-${month}-${day}`;

	const { data } = await axios.get(`api/movie/soon?release_date=${formattedTomorrow}`);
	return data;
});

const initialState = {
	data: [],
	loading: true,
	error: null,
};

const soonScreenSlice = createSlice({
	name: 'soonScreen',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSoonScreen.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchSoonScreen.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchSoonScreen.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export const soonScreenReducer = soonScreenSlice.reducer;
