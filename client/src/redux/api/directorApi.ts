import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const directorApi = createApi({
        reducerPath: 'directors',
        tagTypes: ['Director'],
        baseQuery: fetchBaseQuery({
                baseUrl: `http://localhost:8000/api/v1/admin`,
                fetchFn: async (...arg) => {
                        return fetch(...arg)
                }
        }),
        endpoints: (build) => ({
                getAllDirector: build.query({
                        query: () => '/directors',
                        providesTags: ['Director']
                }),
                getDirectorById: build.mutation({
                        query: (id:number) => `/directors/${id}`,
                        providesTags: ['Director']
                }),
                addDirectors: build.mutation({
                        query: (director) => ({
                                url: 'directors',
                                method: 'POST',
                                headers:  {
                                        'Content-Type': 'application/json'
                                },
                                body: director
                        }),
                        invalidatesTags:['Director']
                }),
                updateDirectors: build.mutation({
                        query: (director) => ({
                                url: `/directors/${director.id}`,
                                method: 'PATCH',
                                body: director
                        }),
                        invalidatesTags:['Director']
                }),
                deleteDirectors: build.mutation({
                        query:(id:number) =>({
                                url: `/directors/${id}`,
                                method:'DELETE',
                        }),
                        invalidatesTags:['Director']
                })
        })
})
export const {useGetAllDirectorQuery,useAddDirectorsMutation,useDeleteDirectorsMutation,useGetDirectorByIdMutation,useUpdateDirectorsMutation } = directorApi;
export const directorReducer = directorApi.reducer;
export default directorApi