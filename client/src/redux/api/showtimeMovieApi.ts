import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IShowTime } from "../../interfaces/showtime";
const showtimeMovieApi = createApi({
    reducerPath: "Movie",
    baseQuery: fetchBaseQuery({
        baseUrl:  import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
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