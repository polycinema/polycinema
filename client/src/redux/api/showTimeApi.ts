import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IShowTime } from "../../interfaces/showtime";
import { pause } from "../../utils/pause";
const showtimeApi = createApi({
    reducerPath: "showtime",
    tagTypes: ['showtime'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            await pause(1500);
            return await fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getShowTimes: build.query<IShowTime[], void>({
            query: () => ({
                url: "/showtime",
            }),
            providesTags: ['showtime']

        }),
        getByIdShowTime: build.query({
            query: (id) => ({
                url: `/showtime/${id}`,
            }),
            providesTags: ['showtime']

        }),
        CreateShowTime: build.mutation({
            query: (showtime) => ({
                url: `/showtime`,
                method: "POST",
                body: showtime,
            }),
            invalidatesTags: ['showtime']

        }),
        UpdateShowTime: build.mutation({
            query: (showtime) => ({
                url: `/showtime/${showtime.id}`,
                method: "PUT",
                body: showtime,
            }),
            invalidatesTags: ['showtime']

        }),
        RemoveShowTime: build.mutation({
            query: (id) => ({
                url: `/showtime/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['showtime']

        }),
    }),
});
export const {
    useGetShowTimesQuery,
    useGetByIdShowTimeQuery,
    useCreateShowTimeMutation,
    useRemoveShowTimeMutation,
    useUpdateShowTimeMutation,
} = showtimeApi;
export const showtimeReducer = showtimeApi.reducer;
export default showtimeApi