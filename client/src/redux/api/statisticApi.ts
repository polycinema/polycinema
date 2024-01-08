import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITop10Movie } from "../../interfaces/top10movie";

const statisticApi = createApi({
    reducerPath: "statistic",
    tagTypes: ["Statistic"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getStatisticWeek: build.query({
            query: () => `/statistic-in-week`,
            providesTags: ["Statistic"],
        }),
        getStatisticMonth: build.query({
            query: () => `/statistic-in-month`,
            providesTags: ["Statistic"],
        }),
        getStatisticyear: build.query({
            query: () => `/statistic-in-year`,
            providesTags: ["Statistic"],
        }),
        getTop10Movie : build.query<ITop10Movie[],void>({
            query: () => `/top-movies`,
            providesTags: ["Statistic"],
        }),
        getTop1Movie : build.query<ITop10Movie[],void>({
            query: () => `/top1-movie`,
            providesTags: ["Statistic"],
        }),
        StatisticCustom : build.mutation({
            query: (date) => ({
                url:'/statistc-in-range',
                method:"POST",
                body:date
            }),
            invalidatesTags: ["Statistic"],
        })
    }),
});

export const {
    useGetStatisticMonthQuery,
    useGetStatisticWeekQuery,
    useGetStatisticyearQuery,
    useGetTop10MovieQuery,
    useStatisticCustomMutation,
    useGetTop1MovieQuery
} = statisticApi;
export const statisticReducer = statisticApi.reducer;
export default statisticApi;
