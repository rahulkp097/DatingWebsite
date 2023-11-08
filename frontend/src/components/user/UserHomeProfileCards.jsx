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

import CaroselComponent from "./CaroselComponent";
import Loader from "./Loader";

const UserHomeProfileCards = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("All"); // Added selectedGender state
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [getUserListApi] = useGetHomeMutation();
  const [sendInterestApi,{isLoading}] = useSendInterestRequestMutation();
  const [cancelInterestApi] = useCancelInterestRequestMutation();

  const isMatchingCity = users.filter(
    (profile) => profile.city === userInfo?.city
  );

  const isMatchingQualification=users.filter(
    (profile) => profile.education === userInfo?.education
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
        setUsers(res.sortedUsers);
      }
    } catch (error) {
      if (error.data.user) {
        dispatch(setCredentials(error.data.user));
        toast.warning(error.data.message);
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
        const res = await sendInterestApi({ targetId, userId }).unwrap();
        if (res.success) {
          toast.success(res.message);
          dispatch(setCredentials({ ...res.user }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGender === "All" || user.gender === selectedGender)
  );



  return (
    <div className="min-h-screen">
       


       <div className="max-w-lg mx-auto m-6" style={{ position: "sticky", top: 0, zIndex: 999, backgroundColor: "white" }}>
  <div className="relative">
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
      <svg
        className="h-5 w-5 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <input
      className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Search users..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
</div>

<details className="collapse ">
  <summary className="collapse-title text-xl font-medium">
  <h1 className="text-3xl font-semibold m-6 text-center sm:text-left">
            People in Your city
          </h1>
    </summary>
  <div className="collapse-content"> 
   
<CaroselComponent data={isMatchingCity} />




  </div>
</details>
    








      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12">
        <button
          className={`${
            selectedGender === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          } px-4 py-2 rounded-md hover:bg-info hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={() => setSelectedGender("All")}
        >
          All
        </button>
        <button
          className={`${
            selectedGender === "Male"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          } px-4 py-2 rounded-md hover:bg-info hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={() => setSelectedGender("Male")}
        >
          Male
        </button>
        <button
          className={`${
            selectedGender === "Female"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          } px-4 py-2 rounded-md hover:bg-info hover:text-white transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={() => setSelectedGender("Female")}
        >
          Female
        </button>
      </div>

      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-6">
        {filteredUsers?.map((profile, index) => (
          <div
            key={index}
            className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md"
          >
            <div className="relative h-80 overflow-hidden rounded-t-xl bg-white">
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
              {isLoading ? <Loader/> :
              <button
              className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => sendOrCancelRequest(profile._id)}
              >
                {isRequestSent(profile._id)
                  ? "Cancel Interest"
                  : "Send Interest"}
              </button>
                }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomeProfileCards;
