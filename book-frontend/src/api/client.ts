import axios, {
    AxiosError,
    type InternalAxiosRequestConfig,
} from "axios";

// 🔹 Create Axios Instance
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔹 Request Interceptor (FIXED TYPES)
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // ✅ Ensure headers exist (important fix)
        config.headers = config.headers ?? {};

        // 👉 Example: attach token
        // const token = authStore.token;
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 🔹 Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // 🔥 Unwrap NestJS uniform global response interceptor
        if (response.data && typeof response.data === 'object' && 'success' in response.data && 'data' in response.data) {
            response.data = response.data.data;
        }
        return response;
    },
    async (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401) {
            console.warn("Unauthorized - session expired");

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }

        if (status === 500) {
            console.error("Server error occurred");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;