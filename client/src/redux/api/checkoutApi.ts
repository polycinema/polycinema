import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const checkoutApi = createApi({
    reducerPath: "checkout",
    tagTypes: ["Checkout"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return await fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getShowTimeByMovie: build.query({
            query: (movieId) => `/showtimes/${movieId}`,
            providesTags: ["Checkout"],
        }),
        getSeatsByShowTime: build.query({
            query: (showtimeId) => `/seats/${showtimeId}`,
            providesTags: ["Checkout"],
        }),
        getAllProducts: build.query({
            query: () => `/admin/products`,
        }),
        checkoutBooking: build.mutation({
            query: (booking) => ({
                url: `/bookings`,
                method: "POST",
                body: booking,
            }),
            invalidatesTags: ["Checkout"],
        }),
        getAllBookings: build.query({
            query: () => `/bookings`,
            providesTags: ["Checkout"],
        }),
        getBookingById: build.query({
            query: (id) => `/bookings/${id}`,
            providesTags: ["Checkout"],
        }),
        getBookingsByUser: build.query({
            query: (userID) => `/bookings/user/${userID}`,
        }),
        updateSeatStatus: build.mutation({
            query: (seat) => ({
                url: `seat-reservation/${seat.id}`,
                method: "POST",
                body: { status: seat.status, user_id: seat.user_id },
            }),
            invalidatesTags: ["Checkout"],
        }),
        updateSatisfied: build.mutation({
            query: (booking) => ({
                url: `/satisfied-booking/${booking.key}`,
                method: "POST",
                body: booking,
            }),
            invalidatesTags: ["Checkout"],
        }),
        updateNotYet: build.mutation({
            query: (booking) => ({
                url: `/not-yet-booking/${booking.key}`,
                method: "POST",
                body: booking,
            }),
            invalidatesTags: ["Checkout"],
        }),
        softDeleteBooking: build.mutation({
            query: (booking_id) => ({
                url: `/change-level-booking`,
                method: "POST",
                body: booking_id,
            }),
            invalidatesTags: ["Checkout"],
        }),
        getBookingsSoft: build.query<any[],any>({
            query: () => `/booking-in-trash`,
            providesTags: ["Checkout"],
        }),
    }),
});

export const {
    useGetShowTimeByMovieQuery,
    useGetSeatsByShowTimeQuery,
    useGetAllProductsQuery,
    useCheckoutBookingMutation,
    useGetAllBookingsQuery,
    useUpdateSeatStatusMutation,
    useUpdateNotYetMutation,
    useUpdateSatisfiedMutation,
    useGetBookingByIdQuery,
    useSoftDeleteBookingMutation,
    useGetBookingsSoftQuery
} = checkoutApi;
export const checkoutReducer = checkoutApi.reducer;
export default checkoutApi;
