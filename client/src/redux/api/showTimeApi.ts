import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IShowTime } from "../../interfaces/showtime";
import { pause } from "../../utils/pause";
const showtimeApi = createApi({
    reducerPath: "showtime",
    tagTypes: ['showtime'],
    baseQuery: fetchBaseQuery({
        baseUrl:  `http://localhost:8000/api/v1`,
        fetchFn: async (...arg) => {
            await pause(1500);
            return await fetch(...arg);
          },
    }),
    endpoints: (build) => ({
        getShowTimes: build.query<IShowTime[], void>({
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
    useGetShowTimesMovieQuery
} = showtimeApi;
export const showtimeReducer = showtimeApi.reducer;
export default showtimeApi