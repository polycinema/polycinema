import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { pause } from '../../utils/pause';



const statisticApi = createApi({
        reducerPath:"statistic",
        tagTypes:['Statistic'],
        baseQuery:fetchBaseQuery({
                baseUrl:"http://localhost:8000/api/v1",
                fetchFn:async(...arg)=>{
                        await pause(3000)
                        return fetch(...arg)
                }
        }),
        endpoints:(build)=>({
                getStatisticWeek: build.query({
                        query:()=> `/statistic-in-week`,
                        providesTags:['Statistic']
                }),
                getStatisticMonth: build.query({
                        query:()=> `/statistic-in-month`,
                        providesTags:['Statistic']
                }),
                getStatisticyear: build.query({
                        query:()=> `/statistic-in-year`,
                        providesTags:['Statistic']
                }),
        
        })
})

export const {useGetStatisticMonthQuery,useGetStatisticWeekQuery,useGetStatisticyearQuery} = statisticApi;
export const statisticReducer = statisticApi.reducer;
export default statisticApi