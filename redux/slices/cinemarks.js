import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios';

export const getCinemarks = createAsyncThunk('cinemarks/fetchCinemarks', async () => {
	const location = await AsyncStorage.getItem('location');
	const myLocation = JSON.parse(location);
	const { data } = await axios.get(`api/city/${myLocation.id}/objects`);
	return data;
});

const initialState = {
	data: [],
	loading: true,
	error: null,
};

const cinemarksSlice = createSlice({
	name: 'cinemarks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCinemarks.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCinemarks.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(getCinemarks.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			});
	},
});

export const cinemarksReducer = cinemarksSlice.reducer;
