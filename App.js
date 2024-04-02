import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import { getCarousel } from './redux/slices/carousel';
import { getCinemarks } from './redux/slices/cinemarks';
import { getNowScreen } from './redux/slices/nowscreen';
import { getSoonScreen } from './redux/slices/soonscreen';
import { fetchGetTheme } from './redux/slices/theme';

import store from './redux/store';
import MainPage from './pages/MainPage';
import SetLocationPage from './pages/SetLocationPage';

const windowWidth = Dimensions.get('window').width;

function Screen() {
	const Stack = createNativeStackNavigator();
	const dispatch = useDispatch();
	const location = useSelector((state) => state.location.location);

	const deleteLocation = useCallback(async () => {
		try {
			await AsyncStorage.removeItem('location');
			dispatch({ type: 'location/deleteLocation' });
		} catch (error) {
			console.error('Error deleting location:', error);
		}
	}, [dispatch]);

	useEffect(() => {
		if (location.id !== undefined) {
			dispatch(getCarousel());
			dispatch(getCinemarks());
			dispatch(getNowScreen());
			dispatch(getSoonScreen());
			dispatch(fetchGetTheme());
		}
	}, [location]);


	if (location.id === undefined) {
		return <SetLocationPage />;
	}

	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" options={headerOptions} component={MainPage} />
		</Stack.Navigator>
	);
}

const headerOptions = {
	headerTitle: () => <LogoTitle />,
	headerRight: () => (
		<TouchableOpacity onPress={{}}>
			<AntDesign name="setting" size={24} color="white" />
		</TouchableOpacity>
	),
	headerStyle: {
		backgroundColor: '#444',
	},
};

function LogoTitle() {
	const [imageHeight, setImageHeight] = useState(null);
	const image = require('./assets/logo.png');

	const handleImageLoad = (event) => {
		const { height, width } = event.nativeEvent.source;
		const aspectRatio = height / width;
		const calculatedHeight = aspectRatio * windowWidth;
		setImageHeight(calculatedHeight);
	};

	return (
		<Image source={image} onLoad={handleImageLoad} style={{ width: 130, height: imageHeight, resizeMode: 'contain' }} />
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar style="inverted" translucent={true} showHideTransition="fade" />
			<NavigationContainer>
				<Screen />
			</NavigationContainer>
		</Provider>
	);
}
