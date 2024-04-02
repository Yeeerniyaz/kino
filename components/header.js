import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MainPage from '../pages/MainPage';

const Header = {
  name: "Home",
  options: {
    headerTitle: () => <LogoTitle />,
    headerRight: () => (
      <TouchableOpacity onPress={deleteLocation}>
        <AntDesign name="setting" size={24} color="white" />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: '#444',
    },
    
    
  },
  component: MainPage,
};

function LogoTitle() {
	const [imageHeight, setImageHeight] = useState(null);
	const image = require('../assets/logo.png');

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

export default Header;
