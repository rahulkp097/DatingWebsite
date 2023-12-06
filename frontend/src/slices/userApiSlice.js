import { apiSlice } from "./apiSlice";
import { userApi } from "../config/API.js";

const USERS_URL = userApi;

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    verifyOTP: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/otp`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "put",
        body: data,
        credentials: "include",
      }),
    }),
    uploadPhotoToCloudinary: builder.mutation({
      query: (data) => ({
        url: `https://api.cloudinary.com/v1_1/dzwiqrzng/image/upload`,
        method: "POST",
        body: data,
      }),
    }),

    getHome: builder.mutation({
      query: (Id) => ({
        url: `${USERS_URL}/home`,
        method: "get",
        params: {
          Id: Id,
        },
        credentials: "include",
      }),
    }),

    updateUserProfilePhoto: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profilephoto`,
        method: "put",
        body: data,
        credentials: "include",
      }),
    }),

    uploadphotos: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/uploadphotos`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    setAsProfilePhtos: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/setasprofilephoto`,
        method: "put",
        body: data,
        credentials: "include",
      }),
    }),

    deleteSelectedPhoto: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/deletephoto`,
        method: "delete",
        body: data,
        credentials: "include",
      }),
    }),

    getUserProfile: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/profile`,
        method: "get",
        credentials: "include",
        params: {
          userId: userId,
        },
      }),
    }),

    passwordResetRequest: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resestpassword`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),
    resestPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/confirmpassword`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    sendInterestRequest: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sendinterest`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    cancelInterestRequest: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/cancelinterest`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    cancelReceivedInterestRequest: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/cancelreceivedinterest`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    getInterestLIst: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/interestslist/${userId}`,
        method: "get",
        credentials: "include",
      }),
    }),

    acceptInterestRequest: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/acceptinterest`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    getMatchList: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/match/${userId}`,
        method: "get",
        credentials: "include",
      }),
    }),

    deleteMatch: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/deletematch`,
        method: "delete",
        body: data,
        credentials: "include",
      }),
    }),

    getTargetUserProfile: builder.mutation({
      query: ({ userId, user }) => ({
        url: `${USERS_URL}/userprofile`,
        method: "get",
        credentials: "include",
        params: {
          userId: userId,
          user: user,
        },
      }),
    }),

    googleAuthLogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/googlelogin`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    addToShortList: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addshortlist`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    getShortListProfiles: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/shortlist/${userId}`,
        method: "get",
        credentials: "include",
      }),
    }),

    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updatepassword`,
        method: "put",
        body: data,
        credentials: "include",
      }),
    }),

    GetSubscripctionData: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/subscriptions/${userId}`,
        method: "get",
        credentials: "include",
      }),
    }),

    Pucharsesubscripction: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/pucharsesubscripction`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    searchChatUser: builder.mutation({
      query: (search) => ({
        url: `${USERS_URL}/chat/search`,
        method: "get",
        params: {
          search: search,
        },
        credentials: "include",
      }),
    }),

    accessUserChat: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/chat`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    getUserChat: builder.mutation({
      query: (search) => ({
        url: `${USERS_URL}/chat`,
        method: "get",
        params: {
          search: search,
        },
        credentials: "include",
      }),
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/message`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),

    getAllmessages: builder.mutation({
      query: (chatId) => ({
        url: `${USERS_URL}/message/${chatId}`,
        method: "get",
        credentials: "include",
      }),
    }),

    reportUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reportuser`,
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

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
  useCancelReceivedInterestRequestMutation,
  useGetInterestLIstMutation,
  useAcceptInterestRequestMutation,
  useGetMatchListMutation,
  useDeleteMatchMutation,
  useGetTargetUserProfileMutation,
  useGoogleAuthLoginMutation,
  useAddToShortListMutation,
  useGetShortListProfilesMutation,
  useUpdateUserPasswordMutation,
  useGetSubscripctionDataMutation,
  usePucharsesubscripctionMutation,
  useGetUserChatMutation,
  useSearchChatUserMutation,
  useAccessUserChatMutation,
  useSendMessageMutation,
  useGetAllmessagesMutation,
  useReportUserMutation,
  useUploadphotosMutation,
  useDeleteSelectedPhotoMutation,
  useSetAsProfilePhtosMutation,
} = usersApiSlice;
