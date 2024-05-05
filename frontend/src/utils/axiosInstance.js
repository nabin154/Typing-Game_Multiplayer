const axios = require("axios");

const axiosInstance = axios.create({
    baseUrl: "http://localhost:5000",
    headers:{
    "Content-Type" : 'application/json',
    },
    withCredentials: true,
});


const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post('/api/auth/refresh-token');
        const { accessToken } = response.data.data;
        return accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    } 
};


const navigateToLogin = () => {
  window.location.href = '/'; 
};


axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const accessToken = await refreshAccessToken();
                return axiosInstance(originalRequest);

            } catch (error) {
                console.error('Token refresh failed:', error);
                navigateToLogin();
                throw error;

            }
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;