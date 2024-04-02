import { useSelector } from 'react-redux';

const useGlobalStyles = () => {
	const theme = useSelector((state) => state.theme.theme);

	const primaryColor = theme === 'light' ? '#007bff' : '#33b5e5';
	const backgroundColor = theme === 'light' ? '#ffffff' : '#000';
	const textColor = theme === 'light' ? '#000000' : '#ffffff';
	const containerColor = theme === 'light' ? '#f8f9fa' : '#333333';

	const styles = {
		page: {
			backgroundColor: backgroundColor,
			flex: 1,
		},

		container: {
			backgroundColor: containerColor,
		},

		text: {
			color: textColor,
			fontSize: 16,
		},

		button: {
			backgroundColor: primaryColor,
			color: textColor,
			padding: 10,
		},

		buttonText: {
			color: textColor,
			fontWeight: 'bold',
			fontSize: 16,
		},

		inputContainer: {
			backgroundColor: backgroundColor,
			padding: 10,
		},

		input: {},

		title: {
			fontSize: 24,
			fontWeight: 'bold',
		},

		link: {
			color: primaryColor,
			textDecoration: 'none',
		},

		h1: {
			fontSize: 30,
			fontWeight: 'bold',
		},

		h3: {
			fontSize: 20,
			fontWeight: 'bold',
		},

		h6: {
			fontSize: 16,
			fontWeight: 'bold',
		},
	};

	return styles;
};

export default useGlobalStyles;
