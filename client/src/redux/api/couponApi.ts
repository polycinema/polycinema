import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const couponApi = createApi({
        reducerPath:"coupon",
        tagTypes:['Coupon'],
        baseQuery:fetchBaseQuery({
                baseUrl:"http://localhost:8000/api/v1",
        }),
        endpoints:(build)=>({
                getCouponById: build.query({
                        query:(userId)=> `/all-available-coupons/${userId}`,
                        providesTags:['Coupon']
                }),
                
        })
})

export const {useGetCouponByIdQuery} = couponApi;
export const couponReducer = couponApi.reducer;
export default couponApi