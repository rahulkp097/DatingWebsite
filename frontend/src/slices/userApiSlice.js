import { apiSlice } from "./apiSlice";

const USERS_URL =' http://localhost:5000/api/users'


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
}=usersApiSlice