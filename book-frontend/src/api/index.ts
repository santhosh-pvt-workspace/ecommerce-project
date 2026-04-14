import { Configuration } from '../_api';
import { axiosInstance } from './client';
import { CartApi, UserApi, ProductsApi } from '../_api/api';

export const apiConfig = new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL,
});

// factory function (clean pattern)
export const createApi = <T>(ApiClass: new (...args: any[]) => T): T => {
    return new ApiClass(apiConfig, undefined, axiosInstance as any);
};

export const userApi = createApi(UserApi);
export const cartApi = createApi(CartApi);
export const productApi = createApi(ProductsApi);