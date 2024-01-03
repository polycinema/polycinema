import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../../utils/pause";
const authApi = createApi({
    reducerPath: "auth",
    tagTypes: ["Auth"],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8000/api`,
        fetchFn: async (...arg) => {
            await pause(1500);
            return await fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        register: build.mutation({
            query: (register) => ({
                url: `/register`,
                method: "POST",
                body: register,
            }),
            invalidatesTags: ["Auth"],
        }),
        login: build.mutation({
            query: (login) => ({
                url: `/login`,
                method: "POST",
                body: login,
            }),
            invalidatesTags: ["Auth"],
        }),
        logout: build.mutation({
            query: (user) => ({
                url: `/logout`,
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Auth"],
        }),
        updateProfile: build.mutation({
            query: (user) => ({
                url: `/v1/update-profile`,
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Auth"],
        }),
        getUserById: build.query({
            query:(user_id)=> `/v1/admin/users/${user_id}`,
            providesTags:['Auth']
        })
    }),
});
export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useUpdateProfileMutation,
    useGetUserByIdQuery
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
