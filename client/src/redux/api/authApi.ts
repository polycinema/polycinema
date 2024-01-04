import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
    reducerPath: "auth",
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8000/api`,
        fetchFn: async (...arg) => {
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
        forgotPasword: build.mutation({
            query: (email) => ({
                url: `/v1/forgot-password`,
                method: "POST",
                body: email,
            }),
            invalidatesTags: ["Auth"],
        }),
        resetPasword: build.mutation({
            query: (user) => ({
                url: `/v1/reset-password`,
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
            query: (user_id) => `/v1/admin/users/${user_id}`,
            providesTags: ["Auth"],
        }),
    }),
});
export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useForgotPaswordMutation,
    useResetPaswordMutation,
    useGetUserByIdQuery,
    useUpdateProfileMutation
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
