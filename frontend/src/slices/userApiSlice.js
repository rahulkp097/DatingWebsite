import { apiSlice } from "./apiSlice";
import { userApi } from "../config/API.js"

const USERS_URL =userApi


export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/login`,
                method:'POST',
                body:data,
                credentials: 'include',

            })
           
        }),

        register: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}`,
                method:'POST',
                body:data,
                credentials: 'include',

            })
           
        }),

        verifyOTP: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/otp`,
                method:'POST',
                body:data,
                credentials: 'include',

            })
           
        }),


        


        logout: builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
                credentials: 'include',
                
            })
        }),
     
        updateProfile: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/profile`,
                method:'POST',
                body:data,
                credentials: 'include',

            })
      
        }),
        uploadPhotoToCloudinary: builder.mutation({
            query: (data) => ({
              url: `https://api.cloudinary.com/v1_1/dzwiqrzng/image/upload`, 
              method: 'POST',
              body: data,
              
            }),
          }),


        getHome:builder.mutation({
            query:(Id)=>({
                url:`${USERS_URL}/home`,
                method:'get',
                params:{
                    Id:Id,
                },
                credentials: 'include',
            }),
        }),
          


        updateUserProfilePhoto: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/profilephoto`,
                method:'POST',
                body:data,
                credentials: 'include',

            })
      
        }),


        getUserProfile: builder.mutation({
            query: (userId) => ({
              url: `${USERS_URL}/profile`,
              method: 'get',
              credentials: 'include',
              params: {
                userId: userId,
              },
            }),
          }),
          
        passwordResetRequest:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/resestpassword`,
                method:'post',
                body:data,
                credentials: 'include',

            })
        }),
        resestPassword:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/confirmpassword`,
                method:'post',
                body:data,
                credentials: 'include',

            })
        }),



        sendInterestRequest:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/sendinterest`,
                method:'post',
                body:data,
                credentials: 'include',

            })
        }),

   cancelInterestRequest:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/cancelinterest`,
                method:'post',
                body:data,
                credentials: 'include',

            })
        }),
        getInterestLIst: builder.mutation({
            query: (userId) => ({
              url: `${USERS_URL}/interestslist/${userId}`,
              method: 'get',
              credentials: 'include',
            }),
          }),
          
          acceptInterestRequest: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/acceptinterest`,
              method: 'post',
              body:data,
              credentials: 'include',
            }),
          }),

          getMatchList: builder.mutation({
            query: (userId) => ({
              url: `${USERS_URL}/match/${userId}`,
              method: 'get',
              credentials: 'include',
            }),
          }),

          deleteMatch: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/deletematch`,
                method: 'post',
                body:data,
                credentials: 'include',
              }),
          }),

    })
})


export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useVerifyOTPMutation,
    useUpdateProfileMutation,
    usePasswordResetRequestMutation,
    useResestPasswordMutation,
    useGetUserProfileMutation,
    useUpdateUserProfilePhotoMutation,
    useUploadPhotoToCloudinaryMutation,
    useGetHomeMutation,
    useSendInterestRequestMutation,
    useCancelInterestRequestMutation,
    useGetInterestLIstMutation,
    useAcceptInterestRequestMutation,
    useGetMatchListMutation,
    useDeleteMatchMutation
}=usersApiSlice