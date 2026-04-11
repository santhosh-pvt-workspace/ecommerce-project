import { Configuration } from '../_api';
import { axiosInstance } from './client';
import { UserApi } from '../_api/api';

export const apiConfig = new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL,
});

// factory function (clean pattern)
export const createApi = <T>(ApiClass: new (...args: any[]) => T): T => {
    return new ApiClass(apiConfig, undefined, axiosInstance);
};

export const userApi = createApi(UserApi);