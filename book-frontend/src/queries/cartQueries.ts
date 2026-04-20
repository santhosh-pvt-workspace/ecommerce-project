import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../api';
import type { AddToCartDto, UpdateCartItemDto } from '../_api/api';

const CART_QUERY_KEY = ['cart'];

export const useCartQuery = () => {
    return useQuery({
        queryKey: CART_QUERY_KEY,
        queryFn: async () => {
            const response = await cartApi.cartControllerGetCart();
            return response.data;
        },
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AddToCartDto) => {
            const response = await cartApi.cartControllerAddCart({
                addToCartDto: data
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateCartItemDto }) => {
            const response = await cartApi.cartControllerUpdateCartItem({
                id,
                updateCartItemDto: data
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });
};

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await cartApi.cartControllerRemoveItem({ id });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await cartApi.cartControllerClearCart({ id });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
    });
};
