import { configureStore } from '@reduxjs/toolkit';
import { locationReducer } from './slices/location';
import { cinemarksReducer } from './slices/cinemarks';
import { nowScreenReducer } from './slices/nowscreen';
import { soonScreenReducer } from './slices/soonscreen';
import { carouselReducer } from './slices/carousel';
import { themeReducer } from './slices/theme';

const store = configureStore({
	reducer: {
		location: locationReducer,
		cinemarks: cinemarksReducer,
		nowScreen: nowScreenReducer,
		soonScreen: soonScreenReducer,
		carousel: carouselReducer,
		theme: themeReducer,
	},
});

export default store;
