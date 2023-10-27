import { apiSlice } from "./apiSlice";
import { adminApi } from "../config/API";
const AdminURL =adminApi
export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${AdminURL}`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    adminlogout: builder.mutation({
      query: () => ({
        url: `${AdminURL}/logout`,
        method: "POST",
        credentials: 'include',
      }),
    }),
    adminFetchData:builder.mutation({
      query:()=>({
        url:`${AdminURL}/users`,
        method:"get",
        credentials: 'include',

      })
    }),
    adminUserAction:builder.mutation({
      query:(userId)=>({
        url:`${AdminURL}/users`,
        method:"put",
        body:userId,
        credentials: 'include',
      })
    }),
  }),
});

export const {
  useAdminloginMutation,
  useAdminlogoutMutation,
  useAdminFetchDataMutation,
  useAdminUserActionMutation
} = adminApiSlice;