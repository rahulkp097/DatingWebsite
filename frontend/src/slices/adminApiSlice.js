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


    AddSubscripctionPlan:builder.mutation({
      query:(data)=>({
        url:`${AdminURL}/addsubscription`,
        method:"post",
        body:data,
        credentials: 'include',
      })
    }),


    GetSubscripctionPlans:builder.mutation({
      query:()=>({
        url:`${AdminURL}/subscriptions`,
        method:"get",
        credentials: 'include',
      })
    }),

    UpdateSubscripctionPlan:builder.mutation({
      query:(data)=>({
        url:`${AdminURL}/updatesubscription`,
        method:"put",
        body:data,
        credentials: 'include',
      })
    }),


    DeleteSubscripctionPlan: builder.mutation({
      query: (planId) => ({
        url: `${AdminURL}/deletesubscription/${planId}`,
        method: 'delete',
        credentials: 'include',
      }),
    }),

    getUserActivity: builder.mutation({
      query: (userId) => ({
        url: `${AdminURL}/useractivity/${userId}`,
        method: 'get',
        credentials: 'include',
      }),
    }),
    


    getDashboardData: builder.mutation({
      query: () => ({
        url: `${AdminURL}/dashboard`,
        method: 'get',
        credentials: 'include',
      }),
    }),




  }),
});

export const {
  useAdminloginMutation,
  useGetSubscripctionPlansMutation,
  useAddSubscripctionPlanMutation,
  useAdminlogoutMutation,
  useAdminFetchDataMutation,
  useAdminUserActionMutation,
  useUpdateSubscripctionPlanMutation,
  useDeleteSubscripctionPlanMutation,
  useGetUserActivityMutation,
  useGetDashboardDataMutation
} = adminApiSlice;