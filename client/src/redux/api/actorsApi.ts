import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const actorApi = createApi({
    reducerPath: "actor",
    tagTypes: ["Actor"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return await fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        addActor: build.mutation({
            query: (actor) => ({
                url: "/admin/actors",
                method: "POST",
                body: actor,
            }),
            invalidatesTags: ["Actor"],
        }),
        editActor: build.mutation({
            query: (actor) => ({
                url: "/admin/actors/" + actor.id,
                method: "PATCH",
                body: actor,
            }),
            invalidatesTags: ["Actor"],
        }),
        deleteActor: build.mutation({
            query: (actorId) => ({
                url: "/admin/actors/" + actorId,
                method: "DELETE",
            }),
            invalidatesTags: ["Actor"],
        }),
        getAllActor: build.query<void[],void>({
            query: () => "/admin/actors",
            providesTags: ["Actor"],
        }),
        getSoftActor: build.query<void[],void>({
            query: () => "/actor-in-trash",
            providesTags: ["Actor"],
        }),
        getActorByID: build.query({
            query: (id) => "/admin/actors/" + id,
            providesTags: ["Actor"],
        }),
        softDeleteActor: build.mutation({
            query: (actor_id) => ({
                url: "/change-level-actor",
                method: "POST",
                body: actor_id,
            }),
            invalidatesTags: ["Actor"],
        }),
    }),
});

export const {
    useAddActorMutation,
    useDeleteActorMutation,
    useEditActorMutation,
    useGetActorByIDQuery,
    useGetAllActorQuery,
    useGetSoftActorQuery,
    useSoftDeleteActorMutation
} = actorApi;
export const actorReducer = actorApi.reducer;
export default actorApi;
