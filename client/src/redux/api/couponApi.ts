import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const couponApi = createApi({
    reducerPath: "coupon",
    tagTypes: ["Coupon"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return await fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getCouponByIdUser: build.query({
            query: (userId) => `/all-available-coupons/${userId}`,
            providesTags: ["Coupon"],
        }),
        addCoupon: build.mutation({
            query: (coupon) => ({
                url: "/admin/coupons",
                method: "POST",
                body: coupon,
            }),
            invalidatesTags: ["Coupon"],
        }),
        editCoupon: build.mutation({
            query: (coupon) => ({
                url: "/admin/coupons/" + coupon.id,
                method: "PATCH",
                body: coupon,
            }),
            invalidatesTags: ["Coupon"],
        }),
        deleteCoupon: build.mutation({
            query: (couponId) => ({
                url: "/admin/coupons/" + couponId,
                method: "DELETE",
            }),
            invalidatesTags: ["Coupon"],
        }),
        getAllCoupon: build.query({
            query: () => "/admin/coupons",
            providesTags: ["Coupon"],
        }),
        getSoftCoupon: build.query({
            query: () => "/coupon-in-trash",
            providesTags: ["Coupon"],
        }),
        getCouponByID: build.query({
            query: (id) => "/admin/coupons/" + id,
            providesTags: ["Coupon"],
        }),
        softDeleteCoupon: build.mutation({
            query: (coupon_id) => ({
                url: "/change-level-coupon",
                method: "POST",
                body: coupon_id,
            }),
            invalidatesTags: ["Coupon"],
        }),
    }),
});

export const {
    useGetCouponByIdUserQuery,
    useAddCouponMutation,
    useDeleteCouponMutation,
    useGetAllCouponQuery,
    useEditCouponMutation,
    useGetCouponByIDQuery,
    useGetSoftCouponQuery,
    useSoftDeleteCouponMutation
} = couponApi;
export const couponReducer = couponApi.reducer;
export default couponApi;
