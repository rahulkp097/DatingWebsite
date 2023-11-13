import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAcceptInterestRequestMutation,
  useAddToShortListMutation,
  useCancelInterestRequestMutation,
  useCancelReceivedInterestRequestMutation,
  useGetTargetUserProfileMutation,
  useSendInterestRequestMutation,
} from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const UserProfilePage = () => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserProfileData();
  }, []);

  const [userProfileDataApi] = useGetTargetUserProfileMutation();

  const [userShortListApi, { isLoading: isLoadingShortlist }] = useAddToShortListMutation();

  const [sendInterestApi,{ isLoading: isLoadingInterestsend}] = useSendInterestRequestMutation();
  const [cancelInterestApi] = useCancelInterestRequestMutation();

  const [cancelReceviedInterestAPi] =
    useCancelReceivedInterestRequestMutation();

  const [acceptInterestApi] = useAcceptInterestRequestMutation();

  const { userId } = useParams();
  const getUserProfileData = async () => {
    try {
      const user = userInfo._id;

      const res = await userProfileDataApi({ userId, user }).unwrap();

      setUserData(res.data);

      dispatch(setCredentials(res.user));
    } catch (error) {
      console.log(error);
    }
  };

  const ShortlistSubmission = async () => {
    try {
      const userId = userInfo._id;
      const targetId = userData._id;

      const res = await userShortListApi({ userId, targetId }).unwrap();
    
      if (res.success) {
        getUserProfileData();
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.data.message)
    }
  };

  const acceptInterest = async (targetId) => {
    try {
      const userId = userInfo._id;

      const res = await acceptInterestApi({ targetId, userId }).unwrap();
      console.log(res);
      if (res.success) {
        dispatch(setCredentials({ ...res.user }));
        toast.success(res.message);
        getUserProfileData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelReceviedInterest = async (targetId) => {
    try {
      const userId = userInfo?._id;

      const res = await cancelReceviedInterestAPi({
        targetId,
        userId,
      }).unwrap();
     
      if (res.success) {
        dispatch(setCredentials({ ...res.user }));
        toast.success(res.message);
        getUserProfileData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isRequestSent = (targetId) =>
    userInfo?.interestSend?.includes(targetId);

  const sendOrCancelRequest = async (targetId) => {
    const userId = userInfo?._id;

    console.log(userId, targetId);
    try {
      if (isRequestSent(targetId)) {
        const res = await cancelInterestApi({ targetId, userId }).unwrap();
      

        if (res.success) {
          toast.success(res.message);
          dispatch(setCredentials({ ...res.user }));
        }
      } else {
        const res = await sendInterestApi({ targetId, userId }).unwrap();
        if (res.success) {
          toast.success(res.message);
          dispatch(setCredentials({ ...res.user }));
        }
      }
    } catch (error) {
      toast.error(error.data.message)
    }
  };

  return (
    <div className="container">
      <div className="main-body">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={
                      userData?.image ||
                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    }
                    alt="user"
                    className="rounded-full p-1 bg-slate-400   h-60"
                  />
                  <div className="mt-3   ">
                    <h4>{userData?.name}</h4>

                      {isLoadingShortlist?  <Loader/> :
                    <button
                    onClick={ShortlistSubmission}
                      className="btn btn-neutral"
                      disabled={userInfo?.matches?.includes(userData?._id)}
                    >
                      {userInfo?.shortlist?.includes(userData?._id)
                        ? "Shortlisted"
                        : "Shortlist"}
                    </button>}

                    <button className="btn btn-accent ml-2">Message</button>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="overflow-hidden shadow  rounded-lg border">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-slate-500">
                      Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      This is some information about the user.
                    </p>
                  </div>
                  <div className="border-t  px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y ">
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className=" font-medium text-cyan-900 text-lg">Name</dt>
                        <dd className="mt-1  sm:mt-0 sm:col-span-2">
                          {userData?.name}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className=" text-cyan-900 text-lg">Age</dt>
                        <dd className="mt-1  sm:mt-0 sm:col-span-2">
                          {userData?.age}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-cyan-900 text-lg">
                          Gender
                        </dt>
                        <dd className="mt-1  text-cyan-900 text-lg">
                          {userData?.gender}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-cyan-900 text-lg">
                          Education
                        </dt>
                        <dd className="mt-1  sm:mt-0 sm:col-span-2">
                          {userData?.education}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-cyan-900 text-lg">
                          Occupation
                        </dt>
                        <dd className="mt-1  sm:mt-0 sm:col-span-2">
                          {userData?.occupation}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-cyan-900 text-lg">
                          Hobbies
                        </dt>
                        <dd className="mt-1  sm:mt-0 sm:col-span-2">
                          {userData?.hobbies}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="ttext-cyan-900 text-lg">
                          Email address
                        </dt>
                        <dd className="mt-1sm:mt-0 sm:col-span-2">
                          {userData?.email}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-cyan-900 text-lg">
                          Location
                        </dt>
                        <dd className="mt-1  sm:mt-0 sm:col-span-2">
                          {userData?.city}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-cyan-900 text-lg">bio</dt>
                        <dd className="mt-1  sm:mt-0 sm:col-span-2">
                          {userData?.bio}
                        </dd>
                      </div>
                      {!userInfo?.matches?.includes(userData?._id) &&
                      !userInfo?.interestReceived?.includes(userData?._id) &&
                      !userInfo?.interestSend?.includes(userData?._id) ? (
                        <div className="p-4 pt-0">
                          <button
                          className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => sendOrCancelRequest(userData?._id)}
                          >
                            {isLoadingInterestsend && <Loader/>}
                            {isRequestSent(userData?._id)
                              ? "Cancel Interest"
                              : "Send Interest"}
                          </button>
                            
                        </div>
                      ) : null}

                      {userInfo?.interestReceived?.includes(userData?._id) ? (
                        <div className="p-4 pt-0">
                          <button
                            className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => acceptInterest(userData._id)}
                          >
                            Accept Interest
                          </button>
                          <button
                            className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => cancelReceviedInterest(userData._id)}
                          >
                            Cancel Recieved Interest
                          </button>
                        </div>
                      ) : null}

                      {userInfo?.interestSend?.includes(userData?._id) ? (
                        <div className="p-4 pt-0">
                          
                          <button
                            className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => sendOrCancelRequest(userData?._id)}
                          >
                            
                            {isRequestSent(userData?._id)
                              ? "Cancel Interest"
                              : "Send Interest"}
                          </button>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
