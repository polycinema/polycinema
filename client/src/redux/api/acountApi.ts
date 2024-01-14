import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const acountApi = createApi({
    reducerPath: "Acount",
    tagTypes: ["Acount"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return await fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        addAcount: build.mutation({
            query: (acount) => ({
                url: `/admin/users`,
                method: "POST",
                body: acount,
            }),
            invalidatesTags: ["Acount"],
        }),
        updateAcount: build.mutation({
            query: (acount) => ({
                url: `/admin/users/${acount.id}`,
                method: "PATCH",
                body: acount,
            }),
            invalidatesTags: ["Acount"],
        }),
        deleteAcount: build.mutation({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Acount"],
        }),
        getAllAcountUsers: build.query({
            query: () => `/customers`,
            providesTags: ["Acount"],
        }),
        getAllAcountAdmin: build.query({
            query: () => `/users-admin`,
            providesTags: ["Acount"],
        }),
        getAcounteById: build.query({
            query: (id) => `/admin/users/${id}`,
            providesTags: ["Acount"],
        }),
        getAcountBanned:build.query({
                query: () => `get-banned-user`,
                providesTags:["Acount"]
        }),
        blockAcountById: build.mutation({
                query:(id)=>({
                        url:"/change-status-user",
                        method: "POST",
                        body: id
                }),
                invalidatesTags: ["Acount"]
        })
    }),
});
export const {
    useAddAcountMutation,
    useDeleteAcountMutation,
    useGetAcounteByIdQuery,
    useGetAllAcountAdminQuery,
    useGetAllAcountUsersQuery,
    useUpdateAcountMutation,
    useBlockAcountByIdMutation,
    useGetAcountBannedQuery
} = acountApi;
export const acountReducer = acountApi.reducer;
export default acountApi;
