import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const paymentApi = createApi({
        reducerPath:"payment",
        tagTypes:['Payment'],
        baseQuery:fetchBaseQuery({
                baseUrl:import.meta.env.VITE_API_URL,
                fetchFn:async(...arg)=>{
                        return fetch(...arg)
                }
        }),
        endpoints:(build)=>({
                paymentBooking: build.mutation({
                        query:(payment)=> ({
                                url:`/vnpay-charge/`,
                                method:"POST",
                                body:payment

                        }),
                        invalidatesTags:['Payment']
                })
        })
})

export const {usePaymentBookingMutation } = paymentApi;
export const paymentReducer = paymentApi.reducer;
export default paymentApi