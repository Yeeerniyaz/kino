import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import store from './redux/store';

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar
				style="light"
				backgroundColor="#222"
				translucent={false}
				hidden={false}
				animated={true}
				showHideTransition="fade"
				autoHide={true}
			/>
			<View style={styles.main}></View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		padding: 10,
		backgroundColor: '#222',
	},
});
