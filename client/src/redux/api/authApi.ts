import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000`,
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (register) =>({
        url: `/register`,
        method: 'POST',
        body: register
      })
    }),
    login: build.mutation({
      query: (login) =>({
        url: `/login`,
        method: 'POST',
        body: login
      })
    }),
  })
})
export const {useRegisterMutation,useLoginMutation} = authApi;
export const authReducer = authApi.reducer;
export default authApi