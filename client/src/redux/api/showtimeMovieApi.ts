import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IShowTime } from "../../interfaces/showtime";
import { pause } from "../../utils/pause";
const showtimeMovieApi = createApi({
    reducerPath: "Movie",
    baseQuery: fetchBaseQuery({
        baseUrl:  import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            await pause(1500);
            return await fetch(...arg);
          },
    }),
    endpoints: (build) => ({
        getShowTimesMovie: build.query<IShowTime[], void>({
            query: () => ({
                url: "/showtimes",
            }),
        })
    }),
});
export const {
        useGetShowTimesMovieQuery
} = showtimeMovieApi;
export const showtimeMovieReducer = showtimeMovieApi.reducer;
export default showtimeMovieApi