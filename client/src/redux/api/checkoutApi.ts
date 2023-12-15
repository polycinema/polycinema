import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const checkoutApi = createApi({
        reducerPath:"checkout",
        tagTypes:['Checkout'],
        baseQuery:fetchBaseQuery({
                baseUrl:"http://localhost:8000/api/v1",
                // fetchFn:async(...arg)=>{
                //         return fetch(...arg)
                // }
        }),
        endpoints:(build)=>({
                getShowTimeByMovie: build.query({
                        query:(movieId)=> `/showtimes/${movieId}`,
                        providesTags:['Checkout']
                }),
                getSeatsByShowTime: build.query({
                        query:(showtimeId)=> `/seats/${showtimeId}`,
                        providesTags:['Checkout']
                }),
                getAllProducts:build.query({
                        query:()=> `/admin/products`,
                        providesTags:['Checkout']
                }),
                checkoutBooking: build.mutation({
                        query:(booking)=> ({
                                url:`/bookings`,
                                method: 'POST',
                                body:booking
                        }),
                        invalidatesTags:['Checkout']

                })
        })
})

export const {useGetShowTimeByMovieQuery,useGetSeatsByShowTimeQuery,useGetAllProductsQuery ,useCheckoutBookingMutation} = checkoutApi;
export const checkoutReducer = checkoutApi.reducer;
export default checkoutApi