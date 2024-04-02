import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import axios from '../axios';
import { setLocation } from '../redux/slices/location';

import useGlobalStyles from '../globalStyles';

export default function SetLocationPage() {
	const [allLocations, setAllLocations] = useState([]);
	const globalStyles = useGlobalStyles();
	const dispatch = useDispatch();

	const selectLocation = (location) => {
		dispatch(setLocation(location));
	};

	useEffect(() => {
		const getAll = async () => {
			try {
				const { data } = await axios.get('/api/city');
				setAllLocations(data.data);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};
		getAll();
	}, []);

	return (
		<View style={{ ...globalStyles.page, flex: 1 }}>
			<StatusBar
				style="light"
				translucent={false}
				backgroundColor="#222"
				hidden={false}
				animated={true}
				showHideTransition="fade"
				autoHide={true}
			/>
			<Text style={{ ...globalStyles.text, ...styles.mainText }}>Выберите город</Text>
			{allLocations &&
				allLocations.map((location) => (
					<TouchableOpacity
						key={location.id}
						title={location.name}
						onPress={() => selectLocation(location)}
						style={styles.button}>
						<Text style={styles.buttonText}>{location.name}</Text>
					</TouchableOpacity>
				))}
		</View>
	);
}

const styles = StyleSheet.create({
	mainText: {
		fontSize: 30,
		padding: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	button: {
		backgroundColor: '#31363F',
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginVertical: 5,
		marginHorizontal: 20,
		borderRadius: 8,
		alignItems: 'center',
	},

	buttonText: {
		color: '#fff',
		fontSize: 19,
		fontWeight: 'bold',
	},
});
