import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native'; // добавляем импорт Appearance

export const fetchGetTheme = createAsyncThunk('theme/fetchGetTheme', async () => {
	try {
		const storedTheme = await AsyncStorage.getItem('theme');
		if (storedTheme) {
			return storedTheme;
		} else {
			const deviceTheme = Appearance.getColorScheme() || 'dark';
			return deviceTheme;
		}
	} catch (error) {
		console.error('Error fetching theme:', error);
		throw error;
	}
});

export const fetchSetTheme = createAsyncThunk('theme/fetchSetTheme', async (theme) => {
	try {
		await AsyncStorage.setItem('theme', theme);
		return theme;
	} catch (error) {
		console.error('Error setting theme:', error);
		throw error;
	}
});

const initialState = {
	theme: 'dark',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetTheme.fulfilled, (state, action) => {
				state.theme = action.payload;
			})
			.addCase(fetchSetTheme.fulfilled, (state, action) => {
				state.theme = action.payload;
			});
	},
});

export const themeReducer = themeSlice.reducer;
