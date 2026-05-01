import { productApi } from "@/api";

export const productQueries = {
  // Fetch all products
  all: () => ({
    queryKey: ["products"],
    queryFn: () => productApi.productControllerGetAllProducts().then((res) => res.data),
  }),

  // Fetch single product by id
  detail: (id: string) => ({
    queryKey: ["product", id],
    queryFn: () => productApi.productControllerGetProductById({ id }).then((res) => res.data),
  }),

  
};
