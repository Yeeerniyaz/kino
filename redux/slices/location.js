import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';

export const getLocation = createAsyncThunk('location/getLocation', async () => {
	const location = await AsyncStorage.getItem('location');
	return location ? location : null;
});

export const setLocation = createAsyncThunk('location/setLocation', async (location) => {
	await AsyncStorage.setItem('location', location);
	return location;
});

export const editLocation = createAsyncThunk('location/editLocation', async (location) => {
	await AsyncStorage.setItem('location', location);
	return location;
});

const initialState = {
	location: null,
	loading: true,
	error: null,
};
const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getLocation.pending, (state) => {
				state.loading = true;
			})
			.addCase(getLocation.fulfilled, (state, action) => {
				state.location = action.payload;
				state.loading = false;
			})
			.addCase(getLocation.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			});
		builder
			.addCase(setLocation.pending, (state) => {
				state.loading = true;
			})
			.addCase(setLocation.fulfilled, (state, action) => {
				state.location = action.payload;
				state.loading = false;
			})
			.addCase(setLocation.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			});
		builder
			.addCase(editLocation.pending, (state) => {
				state.loading = true;
			})
			.addCase(editLocation.fulfilled, (state, action) => {
				state.location = action.payload;
				state.loading = false;
			})
			.addCase(editLocation.rejected, (state, action) => {
				state.error = action.error.message;
				state.loading = false;
			});
	},
});

export const locationReducer = locationSlice.reducer;
