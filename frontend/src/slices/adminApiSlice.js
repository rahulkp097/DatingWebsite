import { apiSlice } from "./apiSlice";
const AdminURL =' http://localhost:5000/api/users/admin'
export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${AdminURL}`,
        method: "POST",
        body: data,
      }),
    }),
    adminlogout: builder.mutation({
      query: () => ({
        url: `${AdminURL}/logout`,
        method: "POST",
      }),
    }),
    adminFetchData:builder.mutation({
      query:()=>({
        url:`${AdminURL}/users`,
        method:"get",

      })
    })
  }),
});

export const {
  useAdminloginMutation,
  useAdminlogoutMutation,
  useAdminFetchDataMutation
} = adminApiSlice;