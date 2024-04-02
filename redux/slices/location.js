import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocation = createAsyncThunk('location/getLocation', async () => {
	const location = await AsyncStorage.getItem('location');
	return location != null ? JSON.parse(location) : null;
});

export const setLocation = createAsyncThunk('location/setLocation', async (location) => {
	const jsonValue = JSON.stringify(location);
	await AsyncStorage.setItem('location', jsonValue);
	return location;
});

const initialState = {
	location: {},
	loading: true,
	error: null,
};
const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {
		deleteLocation: (state) => {
			state.location = {};
			state.loading = false;
			state.error = null;
			AsyncStorage.removeItem('location');
		},
	},
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
	},
});

export const locationReducer = locationSlice.reducer;
export const { deleteLocation } = locationSlice.actions;
