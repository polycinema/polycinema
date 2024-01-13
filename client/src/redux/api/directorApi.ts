import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const directorApi = createApi({
    reducerPath: "director",
    tagTypes: ["Director"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getAllDirectors: build.query({
            query: () => `/admin/directors`,
            providesTags: ["Director"],
        }),
        getDirectorById: build.query({
            query: (id: string | number | undefined) => `/directors/${id}`,
            providesTags: ["Director"],
        }),
        addDirector: build.mutation({
            query: (director) => ({
                url: `/admin/directors`,
                method: "POST",
                body: director,
            }),
            invalidatesTags: ["Director"],
        }),
        updateDirector: build.mutation({
            query: (director) => ({
                url: `/admin/directors/${director.id}`,
                method: "PATCH",
                body: director,
            }),
            invalidatesTags: ["Director"],
        }),
        // removeMovie: build.mutation({
        //     query: (id) => ({
        //         url: `/admin/movies/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["Movie"],
        // }),
        SoftDeleteDirector: build.mutation({
            query: (director_id) => ({
                url: `/change-level-director`,
                method: "POST",
                body: director_id,
            }),
            invalidatesTags: ["Director"],
        }),
        getDirectorSoft: build.query({
            query: () => `/director-in-trash`,
            providesTags: ["Director"],
        }),
    }),
});

export const {
   useAddDirectorMutation,
   useGetAllDirectorsQuery,
   useGetDirectorByIdQuery,
   useGetDirectorSoftQuery,
   useSoftDeleteDirectorMutation,
   useUpdateDirectorMutation
} = directorApi;
export const directorReducer = directorApi.reducer;
export default directorApi;
