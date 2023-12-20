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
                }),
                getAllBookings:build.query({
                        query:()=> `/bookings`,
                        providesTags:['Checkout']
                }),
                updateSeatStatus:build.mutation({
                        query:(seat)=> ({
                                url:`seat-reservation/${seat.id}`,
                                method: 'POST',
                                body:{status:seat.status,user_id:seat.user_id}
                        }),
                        invalidatesTags:['Checkout']

                }),
        })
})

export const {useGetShowTimeByMovieQuery,useGetSeatsByShowTimeQuery,useGetAllProductsQuery ,useCheckoutBookingMutation,useGetAllBookingsQuery,useUpdateSeatStatusMutation} = checkoutApi;
export const checkoutReducer = checkoutApi.reducer;
export default checkoutApi