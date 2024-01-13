import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const productApi = createApi({
    reducerPath: "Product",
    tagTypes: ["Product"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return await fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        addProduct: build.mutation({
            query: (product) => ({
                url: `/admin/products`,
                method: "POST",
                body: product,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: build.mutation({
            query: (product) => ({
                url: `/admin/products/${product.id}`,
                method: "PATCH",
                body: product,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `/admin/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
        getAllProducts: build.query({
            query: () => `/admin/products`,
            providesTags: ["Product"],
        }),
        getProductById: build.query({
            query: (id) => `/admin/products/${id}`,
            providesTags: ["Product"],
        }),
        SoftDeleteProduct: build.mutation({
            query: (product_id) => ({
                url: `/change-level-product`,
                method: "POST",
                body: product_id,
            }),
            invalidatesTags: ["Product"],
        }),
        getAllSoftProduct: build.query({
            query: () => `/product-in-trash`,
            providesTags: ["Product"],
        }),
    }),
});
export const {
    useAddProductMutation,
    useDeleteProductMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useSoftDeleteProductMutation,
    useGetAllSoftProductQuery
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
