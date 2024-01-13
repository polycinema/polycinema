import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const genresApi = createApi({
    reducerPath: "genres",
    tagTypes: ["Genres"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getAllGenres: build.query({
            query: () => `/admin/genres`,
            providesTags: ["Genres"],
        }),
        getGenresById: build.query({
            query: (id: string | number | undefined) => `/genres/${id}`,
            providesTags: ["Genres"],
        }),
        addGenres: build.mutation({
            query: (genre) => ({
                url: `/admin/genres`,
                method: "POST",
                body: genre,
            }),
            invalidatesTags: ["Genres"],
        }),
        updateGenres: build.mutation({
            query: (genre) => ({
                url: `/admin/genres/${genre.id}`,
                method: "PATCH",
                body: genre,
            }),
            invalidatesTags: ["Genres"],
        }),
        // removeMovie: build.mutation({
        //     query: (id) => ({
        //         url: `/admin/movies/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["Movie"],
        // }),
        SoftDeleteGenres: build.mutation({
            query: (genre_id) => ({
                url: `/change-level-genre`,
                method: "POST",
                body: genre_id,
            }),
            invalidatesTags: ["Genres"],
        }),
        getGenresSoft: build.query({
            query: () => `/genre-in-trash`,
            providesTags: ["Genres"],
        }),
    }),
});

export const {
   useAddGenresMutation,
   useGetAllGenresQuery,
   useGetGenresByIdQuery,
   useGetGenresSoftQuery,
   useSoftDeleteGenresMutation,
   useUpdateGenresMutation
} = genresApi;
export const genresReducer = genresApi.reducer;
export default genresApi;
