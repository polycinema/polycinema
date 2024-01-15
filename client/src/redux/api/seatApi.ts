import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const seatApi = createApi({
    reducerPath: "seat",
    tagTypes: ["Seat"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getAllSeatType: build.query({
            query: () => `/admin/seat-types`,
            providesTags: ["Seat"],
        }),
        getSeatTypeById: build.query({
            query: (id: string | number | undefined) => `/admin/seat-types/${id}`,
            providesTags: ["Seat"],
        }),
        addSeatType: build.mutation({
            query: (seat) => ({
                url: `/admin/seat-types`,
                method: "POST",
                body: seat,
            }),
            invalidatesTags: ["Seat"],
        }),
        updateSeatType: build.mutation({
            query: (seat) => ({
                url: `/admin/seat-types/${seat.id}`,
                method: "PATCH",
                body: seat,
            }),
            invalidatesTags: ["Seat"],
        }),
        
        SoftDeleteSeatType: build.mutation({
            query: (seat_id) => ({
                url: `/change-level-seat-type`,
                method: "POST",
                body: seat_id,
            }),
            invalidatesTags: ["Seat"],
        }),
        getSeatTypeSoft: build.query({
            query: () => `/seat-type-in-trash`,
            providesTags: ["Seat"],
        }),
    }),
});

export const {
    useAddSeatTypeMutation,
    useGetAllSeatTypeQuery,
    useGetSeatTypeByIdQuery,
    useUpdateSeatTypeMutation,
    useGetSeatTypeSoftQuery,
    useSoftDeleteSeatTypeMutation
} = seatApi;
export const seatReducer = seatApi.reducer;
export default seatApi;
