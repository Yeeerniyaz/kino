import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';
import axios from '../../axios';

export const fetchGetNowScreen = createAsyncThunk('nowScreen/fetchGetNowScreen', async () => {
	const location = await AsyncStorage.getItem('location');
	const date = new Date();
	const { data } = await axios.get(`api/movie/today?city=${location}&start=${date}`);
});

const initialState = {
	data: [],
	loading: true,
	error: null,
};

const nowScreenSlice = createSlice({
	name: 'nowScreen',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGetNowScreen.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchGetNowScreen.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchGetNowScreen.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
		});
	},
});

export const nowScreenReducer = nowScreenSlice.reducer;
