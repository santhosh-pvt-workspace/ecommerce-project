import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // 🔥 VERY IMPORTANT (cookies)
});

// Global error handling
axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            console.log('Unauthorized (cookie expired)');
            // redirect to login if needed
        }
        return Promise.reject(error);
    }
);