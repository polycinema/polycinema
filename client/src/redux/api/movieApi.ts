import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'



const movieApi = createApi({
        reducerPath:"movie",
        tagTypes:['Movie'],
        baseQuery:fetchBaseQuery({
                baseUrl:import.meta.env.VITE_API_URL,
                fetchFn:async(...arg)=>{
                        return fetch(...arg)
                }
        }),
        endpoints:(build)=>({
                getAllMovies: build.query({
                        query:()=> `/admin/movies`,
                        providesTags:['Movie']
                }),
                getMovieById:build.query({
                        query:(id:string|number|undefined)=> `/movies/${id}`,
                        providesTags:['Movie']
                }),
                addMovie:build.mutation({
                        query:(movie)=>({
                                url:`/admin/movies`,
                                method: 'POST',
                                body:movie
                        }),
                        invalidatesTags:['Movie']
                }),
                updateMovie:build.mutation({
                        query:(movie)=>({
                                url:`/admin/movies/${movie.id}`,
                                method: 'PATCH',
                                body:movie
                        }),
                        invalidatesTags:['Movie']

                }),
                removeMovie:build.mutation({
                        query:(id)=>({
                                url:`/admin/movies/${id}`,
                                method:'DELETE'
                        }),
                        invalidatesTags:['Movie']

                })
        })
})

export const {useAddMovieMutation,useGetAllMoviesQuery,useGetMovieByIdQuery,useRemoveMovieMutation,useUpdateMovieMutation} = movieApi;
export const movieReducer = movieApi.reducer;
export default movieApi