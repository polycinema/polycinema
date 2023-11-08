import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const showtimeApi = createApi({
    reducerPath: "showtime",
    baseQuery: fetchBaseQuery({
        baseUrl:  import.meta.env.VITE_API_URL,
    }),
    endpoints: (build) => ({
        getShowTimes: build.query({
            query: () => ({
                url: "/showtime",
            }),
        }),
        getByIdShowTime: build.query({
            query: (id) => ({
                url: `/showtime/${id}`,
            }),
        }),
        CreateShowTime: build.mutation({
            query: (showtime) => ({
                url: `/showtime`,
                method: "POST",
                body: showtime,
            }),
        }),
        UpdateShowTime: build.mutation({
            query: (showtime) => ({
                url: `/showtime/${showtime.id}/edit`,
                method: "PUT",
                body: showtime,
            }),
        }),
        RemoveShowTime: build.mutation({
            query: (id) => ({
                url: `/showtime/${id}`,
                method: "DELETE",
            }),
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