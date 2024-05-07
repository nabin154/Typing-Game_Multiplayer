import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers:{
    "Content-Type" : 'application/json',
    },
    withCredentials: true,
});

const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post('/api/auth/refresh-token');
        const { accessToken } = response.data;
        return accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

const navigateToLogin = () => {
    localStorage.removeItem("userInfo");
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
                // originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
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