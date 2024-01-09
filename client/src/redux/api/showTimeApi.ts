import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IShowtime } from "../../interfaces/showtime";
const showtimeApi = createApi({
    reducerPath: "showtime",
    tagTypes: ['showtime'],
    baseQuery: fetchBaseQuery({
        baseUrl:  import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return await fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getShowTimes: build.query<IShowtime[], void>({
            query: () => ({
                url: "/admin/showtime",
            }),
            providesTags:['showtime']
        }),
        getShowTimesMovie: build.query<void, void>({
            query: () => ({
                url: "/showtimes",
            }),
            providesTags:['showtime']
        }),
        getByIdShowTime: build.query({
            query: (id) => ({
                url: `/admin/showtime/${id}`,
            }),
            providesTags:['showtime']
        }),
        getShowtimeByIDMovie: build.query({
            query: (mvId) => ({
                url: `/showtimes/${mvId}`,
            }),
            providesTags:['showtime']
        }),
        CreateShowTime: build.mutation({
            query: (showtime) => ({
                url: `/admin/showtime`,
                method: "POST",
                body: showtime,
            }),
            invalidatesTags:['showtime']
        }),
        UpdateShowTime: build.mutation({
            query: (showtime) => ({
                url: `/admin/showtime/${showtime.id}`,
                method: "PUT",
                body: showtime,
            }),
            invalidatesTags:['showtime']
        }),
        RemoveShowTime: build.mutation({
            query: (id) => ({
                url: `/admin/showtime/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:['showtime']
        }),
    }),
});
export const {
    useGetShowTimesQuery,
    useGetByIdShowTimeQuery,
    useCreateShowTimeMutation,
    useRemoveShowTimeMutation,
    useUpdateShowTimeMutation,
    useGetShowTimesMovieQuery,
    useGetShowtimeByIDMovieQuery
} = showtimeApi;
export const showtimeReducer = showtimeApi.reducer;
export default showtimeApi