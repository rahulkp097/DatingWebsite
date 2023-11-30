import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAcceptInterestRequestMutation,
  useAddToShortListMutation,
  useCancelInterestRequestMutation,
  useCancelReceivedInterestRequestMutation,
  useGetTargetUserProfileMutation,
  useReportUserMutation,
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
  const [reportReason, setReportReason] = useState(""); // State to hold the selected reason
  const reportReasons = ["Fake Content", "Spam", "Harassment", "Other"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reportUserApi,{isLoading:isLoadingReportUser}]=useReportUserMutation()
  const navigate=useNavigate()
  const handleReport = async(reason,targetId) => {
    try {
      const userId=userInfo?._id
      
      const res=await reportUserApi({reason,userId,targetId}).unwrap()
      
      if(res.success){
        toast.success(res.message)
      }
    } catch (error) {
      console.log(error)
    }
    setIsDropdownOpen(false);
  };


  useEffect(() => {
    getUserProfileData();
  }, []);

  const [userProfileDataApi] = useGetTargetUserProfileMutation();

  const [userShortListApi, { isLoading: isLoadingShortlist }] =
    useAddToShortListMutation();

  const [sendInterestApi, { isLoading: isLoadingInterestsend }] =
    useSendInterestRequestMutation();
  const [cancelInterestApi] = useCancelInterestRequestMutation();

  const [cancelReceviedInterestAPi] =
    useCancelReceivedInterestRequestMutation();

  const [acceptInterestApi] = useAcceptInterestRequestMutation();

  const { userId } = useParams();
  const getUserProfileData = async () => {
    try {
      const user = userInfo._id;

      const res = await userProfileDataApi({ userId, user }).unwrap();
      console.log("res",res)

      setUserData(res.data);

      dispatch(setCredentials(res.user));
    } catch (error) {
      navigate("/error")
      console.log(error);
    }
  };

  const ShortlistSubmission = async () => {
    try {
      const user = userInfo._id;
      const targetId = userId

      const res = await userShortListApi({ user, targetId }).unwrap();

      if (res.success) {
        getUserProfileData();
        toast.success(res.message);

      }
      
    } catch (error) {
      toast.error(error.data.message);
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
      toast.error(error.data.message);
    }
  };

  return (
  <div className="bg-gray-100 min-h-screen">






<section className=" p-5" id="about">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
           
            <div className="md:w-1/2">
              <div
                className="about-avatar"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                 <div className="indicator" >
                       {userData?.subscription?.planName &&          <span className={`indicator-item badge ${userData?.subscription?.planName === 'Premium Plan' ? 'badge-secondary' : 'badge-primary'} hidden sm:inline`}>
              {userData?.subscription?.planName}
            </span>
            }
                <img
                  src={
                    userData?.image ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  alt="Avatar"
                  title="Avatar"
                  className="rounded-full mx-auto md:mx-0 h-80"
                />
</div>
 
                <div className="p-2">
                {userData?.reports?.some(report => report.reporter === userInfo?._id) ? (
    <p className="text-red-600">You have already Already Reported this user</p>
  ) : (
    <>
      {userInfo?.matches?.includes(userData?._id) ? (
        <div className="dropdown dropdown-bottom">
          <label
            tabIndex={0}
            className="btn m-1"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Report User
          </label>
          {isDropdownOpen && (
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {reportReasons.map((reason, index) => (
                <li key={index}>
                  <button
                    className="btn btn-neutral"
                    onClick={() => {
                      setReportReason(reason);
                      handleReport(reason, userId);
                    }}
                  >
                    {reason}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          {isLoadingShortlist ? (
            <Loader />
          ) : (
            <button
              onClick={ShortlistSubmission}
              className="btn btn-neutral"
              disabled={userInfo?.matches?.includes(userData?._id)}
            >
              {userInfo?.shortlist?.includes(userData?._id)
                ? "Shortlisted"
                : "Shortlist"}
            </button>
          )}

          <button
            className="btn btn-accent ml-2"
            onClick={() => sendOrCancelRequest(userData?._id)}
            disabled={
              isLoadingInterestsend ||
              userInfo?.matches?.includes(userData?._id)
            }
          >
            {isLoadingInterestsend ? (
              <Loader />
            ) : (
              <>
                {isRequestSent(userData?._id)
                  ? "Cancel Interest"
                  : "Send Interest"}
              </>
            )}
          </button>
        </>
      )}
    </>
  )}
                </div>
           
              </div>
            </div>

        

            <div className="md:w-1/2">
              <div className="about-text">
                <h3 className="text-accent-content text-2xl font-bold">
                  {userData?.name}
                </h3>

                <p className="text-info-content ">{userData?.bio}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="media">
                    <label className="text-info  text-xl">Occupation</label>
                    <p>{userData?.occupation}</p>
                  </div>

                  <div className="media">
                    <label className="text-info text-xl">Age</label>
                    <p>{userData?.age} </p>
                  </div>
                  <div className="media">
                    <label className="text-info text-xl">Gender</label>
                    <p>{userData?.gender}</p>
                  </div>
                  <div className="media">
                    <label className="text-info text-xl">location</label>
                    <p>{userData?.city}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="media">
                    <label className="text-info text-xl ">Qualification</label>
                    <p>{userData?.education}</p>
                  </div>
                  <div className="media">
                    <label className="text-info text-xl">Hobbies</label>
                    <p>{userData?.hobbies && userInfo?.hobbies.join(", ")}</p>
                  </div>
                  <div className="media">
                    <label className="text-info text-xl">Current Location</label>
                    <p>{userInfo?.currentLocation}</p>
                  </div>

                  <div className="media">
                    <label className="text-info text-xl ">E-mail</label>
                    <p>{userData?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="counter mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"></div>
          </div>
          {userInfo?.interestReceived?.includes(userData?._id) && (
    <div className="mt-4 space-y-2">
      <button
        className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-sm font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => acceptInterest(userData._id)}
      >
        Accept Interest
      </button>
      <button
        className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-sm font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => cancelReceviedInterest(userData._id)}
      >
        Cancel Received Interest
      </button>
    </div>
  )}
        </div>
      </section>



  

    <div className="container mx-auto p-6" >
  <h1 className="text-3xl font-semibold text-center mb-6">
    Photos of {userData?.name}
  </h1>

  {userData?.photos && userData?.photos.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {userData?.photos.map((photo, index) => (
        <div key={index} className="grid gap-4">
          <div>
            <img className="h-auto max-w-full rounded-lg" src={photo} alt={`Photo ${index + 1}`} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">No photos available.</p>
  )}
</div>




    </div>

  );
};

export default UserProfilePage;
