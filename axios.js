import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://afisha.api.kinopark.kz/',
});

instance.interceptors.request.use((config) => {
	config.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMSIsImxvZ2luIjoiZnJvbnQucHJvZCIsInJvbGUiOiJmcm9udCIsIm5hbWUiOiJmcm9udC5wcm9kIiwiY3VzdG9tX2NsYWltcyI6eyJjb250cmFjdF9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMCJ9fQ.vt_WV5qYI_b_8_oBUQK-euPE4WnUdranIeS32QLD0KY`;
	return config;
});

export default instance;
