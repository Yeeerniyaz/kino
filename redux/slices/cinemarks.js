import { Tuple, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';
import axios from '../../axios';

export const fetchCinemarks = createAsyncThunk('cinemarks/fetchCinemarks', async () => {
	const location = await AsyncStorage.getItem('location');
	const { data } = await axios.get(`api/city/${location}/objects`);
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
			.addCase(fetchCinemarks.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCinemarks.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(fetchCinemarks.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			});
	},
});

export const cinemarksReducer = cinemarksSlice.reducer;
