import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios';

export const getNowScreen = createAsyncThunk('nowScreen/fetchGetNowScreen', async () => {
	const location = await AsyncStorage.getItem('location');
	const myLocation = JSON.parse(location);
	const currentDate = new Date();
	const isoDateTime = currentDate.toISOString();

	const { data } = await axios.get(`api/movie/today?city=${myLocation.id}&start=${isoDateTime}`);
	return data;
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
		builder.addCase(getNowScreen.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getNowScreen.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(getNowScreen.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
		});
	},
});

export const nowScreenReducer = nowScreenSlice.reducer;
