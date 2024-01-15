import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootMovie } from "../../interfaces/movie";

const movieApi = createApi({
    reducerPath: "movie",
    tagTypes: ["Movie"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getAllMovies: build.query<RootMovie[],void>({
            query: () => `/admin/movies`,
            providesTags: ["Movie"],
        }),
        getMovieById: build.query({
            query: (id: string | number | undefined) => `/movies/${id}`,
            providesTags: ["Movie"],
        }),
        addMovie: build.mutation({
            query: (movie) => ({
                url: `/admin/movies`,
                method: "POST",
                body: movie,
            }),
            invalidatesTags: ["Movie"],
        }),
        updateMovie: build.mutation({
            query: (movie) => ({
                url: `/admin/movies/${movie.id}`,
                method: "PATCH",
                body: movie,
            }),
            invalidatesTags: ["Movie"],
        }),
        removeMovie: build.mutation({
            query: (id) => ({
                url: `/admin/movies/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Movie"],
        }),
        SoftDeleteMovie: build.mutation({
            query: (movie_id) => ({
                url: `/change-level-movie`,
                method: "POST",
                body: movie_id,
            }),
            invalidatesTags: ["Movie"],
        }),
        getMovieSoft: build.query<RootMovie[],void>({
            query: () => `/movie-in-trash`,
            providesTags: ["Movie"],
        }),
    }),
});

export const {
    useAddMovieMutation,
    useGetAllMoviesQuery,
    useGetMovieByIdQuery,
    useRemoveMovieMutation,
    useUpdateMovieMutation,
    useSoftDeleteMovieMutation,
    useGetMovieSoftQuery
} = movieApi;
export const movieReducer = movieApi.reducer;
export default movieApi;
