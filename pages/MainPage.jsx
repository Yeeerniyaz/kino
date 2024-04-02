import { StyleSheet, Text, View } from 'react-native';

import Carousel from '../components/Carousel';
import useGlobalStyles from '../globalStyles';
import { useSelector } from 'react-redux';

export default function MainPage() {
	const globalStyles = useGlobalStyles();
	const theme = useSelector(state => state.theme)
	return (
		<View style={{ ...globalStyles.page, }}>
			{/* <Carousel /> */}
		</View>
	);
}

const styles = StyleSheet.create({});
