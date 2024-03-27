import { configureStore } from '@reduxjs/toolkit';
import { locationReducer } from './slices/location';
import { cinemarksReducer } from './slices/cinemarks';
import { nowScreenReducer } from './slices/nowscreen';
import { soonScreenReducer } from './slices/soonscreen';

const store = configureStore({
	reducer: {
		location: locationReducer,
		cinemarks: cinemarksReducer,
		nowScreen: nowScreenReducer,
		soonScreen: soonScreenReducer,
	},
});

export default store;
