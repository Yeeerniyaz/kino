import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

export default function CarouselComponent() {
	const { data } = useSelector((state) => state.carousel.data) || [];
	const loading = useSelector((state) => state.carousel.loading);
	const [filteredData, setFilteredData] = useState([]);
	const [imageHeight, setImageHeight] = useState();

	useEffect(() => {
		if (data && Array.isArray(data)) {
			const filtered = data.filter((item) => item?.image_url !== '');
			setFilteredData(filtered);
		}
	}, [data]);

	useEffect(() => {
		if (!loading && filteredData.length > 0) {
			Image.getSize(
				filteredData[0].image_url,
				(width, height) => {
					const aspectRatio = height / width;
					const calculatedHeight = aspectRatio * windowWidth;
					setImageHeight(calculatedHeight);
				},
				(error) => {
					console.error('Error loading image:', error);
				},
			);
		}
	}, [filteredData, loading]);

	if (loading) {
		return <></>;
	}

	return (
		<View style={styles.container}>
			<Swiper style={styles.wrapper} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={4}>
				{filteredData.map((item, index) => (
					<View key={index} style={styles.slide}>
						{item.image_url && (
							<Image source={{ uri: item.image_url }} style={[styles.image, { height: imageHeight }]} />
						)}
					</View>
				))}
			</Swiper>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	slide: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	image: {
		width: windowWidth,
		resizeMode: 'cover',
	},
});
