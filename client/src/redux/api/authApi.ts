import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api`,
    fetchFn: async (...arg) => {
      return await fetch(...arg);
    },
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
    logout: build.mutation({
      query: (user) =>({
        url: `/logout`,
        method: 'POST',
        body:user
      })
    }),
    forgotPasword: build.mutation({
      query: (email) =>({
        url: `/v1/forgot-password`,
        method: 'POST',
        body:email
      })
    }),
    resetPasword: build.mutation({
      query: (user) =>({
        url: `/v1/reset-password`,
        method: 'POST',
        body:user
      })
    }),
  })
})
export const {useRegisterMutation,useLoginMutation,useLogoutMutation,useForgotPaswordMutation,useResetPaswordMutation} = authApi;
export const authReducer = authApi.reducer;
export default authApi