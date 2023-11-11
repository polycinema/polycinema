import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { pause } from '../../utils/pause';



const movieApi = createApi({
        reducerPath:"movie",
        tagTypes:['Movie'],
        baseQuery:fetchBaseQuery({
                baseUrl:"http://localhost:8000/api/v1/admin",
                fetchFn:async(...arg)=>{
                        await pause(3000)
                        return fetch(...arg)
                }
        }),
        endpoints:(build)=>({
                getAllMovies: build.query({
                        query:()=> `/movies`,
                        providesTags:['Movie']
                }),
                getMovieById:build.query({
                        query:(id:string|number|undefined)=> `/movies/${id}`,
                        providesTags:['Movie']
                }),
                addMovie:build.mutation({
                        query:(movie)=>({
                                url:`/movies`,
                                method: 'POST',
                                body:movie
                        }),
                        invalidatesTags:['Movie']
                }),
                updateMovie:build.mutation({
                        query:(movie)=>({
                                url:`/movies/${movie.id}`,
                                method: 'PATCH',
                                body:movie
                        }),
                        invalidatesTags:['Movie']

                }),
                removeMovie:build.mutation({
                        query:(id)=>({
                                url:`/movies/${id}`,
                                method:'DELETE'
                        }),
                        invalidatesTags:['Movie']

                })
        })
})

export const {useAddMovieMutation,useGetAllMoviesQuery,useGetMovieByIdQuery,useRemoveMovieMutation,useUpdateMovieMutation} = movieApi;
export const movieReducer = movieApi.reducer;
export default movieApi