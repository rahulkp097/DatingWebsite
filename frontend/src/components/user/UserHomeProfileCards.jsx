import React, { useEffect, useState } from "react";
import {
  useCancelInterestRequestMutation,
  useGetHomeMutation,
  useSendInterestRequestMutation,
} from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";

import CaroselComponent from "./CaroselComponent";
import Loader from "./Loader";
import Banner from "./Banner";
import { selectSearchQuery } from "../../slices/searchSlice";
import ProfileFilter from "./ProfileFilter";

const UserHomeProfileCards = () => {
  const [users, setUsers] = useState([]);

  const [selectedGender, setSelectedGender] = useState("All"); // Added selectedGender state
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [getUserListApi] = useGetHomeMutation();
  const [sendInterestApi, { isLoading }] = useSendInterestRequestMutation();
  const [cancelInterestApi] = useCancelInterestRequestMutation();
  const [userSubscriptionsPlan, setUserSubscripctionsPlan] = useState();
  const [allSubScriptionPlans, setAllSubScriptionPlans] = useState();
  const searchQuery = useSelector(selectSearchQuery);
  const [loadingStates, setLoadingStates] = useState({ targetId: null });


  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const handleFilter = filteredData => {
    // Handle the filtered data, you can set it to state or perform any other actions
    setFilteredProfiles(filteredData);
  };

  const isMatchingCity = users.filter(
    (profile) => profile.gender !== userInfo?.gender && profile.city === userInfo?.city
  );

  const isMatchingQualification = users.filter(
    (profile) => profile.gender !== userInfo?.gender && profile.education === userInfo?.education
  );

  const isMatchingOccupassion = users.filter(
    (profile) => profile.gender !== userInfo?.gender &&  profile.occupation === userInfo?.occupation
  );


  const isMatchingHobbies = users.filter((profile) =>
    profile.hobbies.some((hobby) => profile.gender !== userInfo?.gender &&  userInfo?.hobbies.includes(hobby))
  );

  const navigate = useNavigate();

  useEffect(() => {
    getUsertList();
  }, []);

  const getUsertList = async () => {
    try {
      let Id = userInfo?._id;

      const res = await getUserListApi(Id).unwrap();

      if (res.success) {
        setUserSubscripctionsPlan(res.currentUser?.subscription?.plan);
        setAllSubScriptionPlans(res.subscriptionPlans);
        setUsers(res.sortedUsers);
      }
    } catch (error) {
      if (error.data.user) {
        dispatch(setCredentials(error?.data?.user));
        toast.warning(error?.data.message);
        return navigate("/login");
      }
      console.log(error);
    }
  };

  const isRequestSent = (targetId) =>
    userInfo?.interestSend?.includes(targetId);

  const sendOrCancelRequest = async (targetId) => {
    const userId = userInfo?._id;
   
    try {
      if (isRequestSent(targetId)) {
        const res = await cancelInterestApi({ targetId, userId }).unwrap();

        if (res.success) {
          toast.success(res.message);
          dispatch(setCredentials({ ...res.user }));
        }
      } else {
        setLoadingStates({ targetId });

        const res = await sendInterestApi({ targetId, userId }).unwrap();
        if (res.success) {
          toast.success(res.message);
          dispatch(setCredentials({ ...res.user }));
          setLoadingStates({ targetId: null });
        }
      }
    } catch (error) {
      setLoadingStates({ targetId: null });
      toast.error(error.data.message);
    }
  };
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (userInfo?.subscription?.status
        ? (userInfo?.subscription?.plan
            ? user.gender !== userInfo?.gender
            : true)
        : true) &&
      (selectedGender === "All" || user.gender === selectedGender)
  );
  


  const shouldShowRecommendations =
  !searchQuery && userInfo?.subscription?.status;



  return (

    <div className="min-h-screen bg-gray-200">
{!searchQuery &&
<div className="flex justify-center items-center">
            <Banner />
          </div>
}
  {/* <ProfileFilter profiles={filteredProfiles} onFilter={handleFilter} /> */}

     {shouldShowRecommendations && (
        <>
          

          {userSubscriptionsPlan?.recommendations?.basedOnLocation &&
          isMatchingCity.length > 0 ? (
            <>
              <h1 className="text-3xl font-semibold m-6 text-center sm:text-left">
                People in your city
              </h1>
              <CaroselComponent data={isMatchingCity} />
            </>
          ) : null}

          {userSubscriptionsPlan?.recommendations?.basedOnJob &&
          isMatchingOccupassion.length > 0 ? (
            <>
              <h1 className="text-3xl font-semibold m-6 text-center sm:text-left">
                People With your same Job
              </h1>
              <CaroselComponent data={isMatchingOccupassion} />
            </>
          ) : null}

          {userSubscriptionsPlan?.recommendations?.basedOnHobbies &&
          isMatchingHobbies.length > 0 ? (
            <>
              <h1 className="text-3xl font-semibold m-6 text-center sm:text-left">
                People With your same Hobbies
              </h1>
              <CaroselComponent data={isMatchingHobbies} />
            </>
          ) : null}

          {userSubscriptionsPlan?.recommendations?.basedOnQualifications &&
          isMatchingQualification.length > 0 ? (
            <>
              <h1 className="text-3xl font-semibold m-6 text-center sm:text-left">
                People With your same Qualification
              </h1>
              <CaroselComponent data={isMatchingQualification} />
            </>
          ) : null}
        </>
      )}


{
  !userInfo?.subscription?.plan &&

     <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 m-5">
        <button
          className={`${
            selectedGender === "All"
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-gray-800"
          } px-4 py-2 rounded-md   transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={() => setSelectedGender("All")}
          >
          All
        </button>
        <button
          className={`${
            selectedGender === "Male"
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-gray-800"
          } px-4 py-2 rounded-md   transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={() => setSelectedGender("Male")}
          >
          Male
        </button>
        <button
          className={`${
            selectedGender === "Female"
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-gray-800"
          } px-4 py-2 rounded-md  transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={() => setSelectedGender("Female")}
          >
          Female
        </button>
      </div>

} 

<h1 className="text-3xl font-semibold m-6 text-center sm:text-center">
                List of all people 
              </h1>
      {filteredUsers.length > 0 ? (
  <div className="flex justify-center items-center">
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {filteredUsers?.map((profile, index) => (
        <div className="indicator" key={index}>
          {profile?.subscription?.planName && (
            <span className="indicator-item badge badge-primary">
              {profile?.subscription?.planName}
            </span>
          )}

          <div className="relative flex flex-col rounded-xl bg- text-gray-700 bg-white shadow-md">
            <div className="relative h-80 w-80 overflow-hidden rounded-t-xl ">
              <Link to={`/userprofile/${profile._id}`}>
                <img
                  src={
                    profile?.image ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  className="h-full w-full object-cover"
                  alt="Profile Image"
                />
              </Link>
            </div>

            <div className="p-4">
              <p className="block font-sans text-base font-medium text-blue-gray-900 antialiased">
                {profile?.name} - {profile?.gender}
              </p>
              <p className="block font-sans text-base font-medium text-blue-gray-900 antialiased">
                {profile?.age} years old, {profile?.city}
              </p>
            </div>

            <div className="p-4 pt-0">
              <button
                className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-sm font-bold uppercase text-sky-600 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => sendOrCancelRequest(profile._id)}
              >
                {loadingStates.targetId === profile._id ? (
                  <Loader />
                ) : isRequestSent(profile._id) ? (
                  "Cancel Interest"
                ) : (
                  "Send Interest"
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <h1 className="text-3xl font-semibold m-6 text-center">
    No results found for your search.
  </h1>
)}

    </div>
  );
};

export default UserHomeProfileCards;
