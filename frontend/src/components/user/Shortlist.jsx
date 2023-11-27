import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddToShortListMutation,
  useGetShortListProfilesMutation,
} from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Shortlist() {
  const [shortListProfiles, setShortlistProfiles] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [getShortlistProfileApi] = useGetShortListProfilesMutation();
  const [userShortListApi] = useAddToShortListMutation();
  useEffect(() => {
    getShortListProfiles();
  }, []);

  const getShortListProfiles = async () => {
    try {
      const userId = userInfo._id;
      const res = await getShortlistProfileApi(userId).unwrap();

      if (res.success) {
        dispatch(setCredentials(res.user));
        setShortlistProfiles(res.user.shortlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ShortlistSubmission = async (targetId) => {
    try {
      const user = userInfo._id;

      const res = await userShortListApi({ user, targetId }).unwrap();
      if (res.success) {
        toast.success(res.message);
        getShortListProfiles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  p-4 min-h-screen  bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Shortlisted Profiles
      </h1>
      {shortListProfiles?.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <h1 className="text-3xl font-semibold text-gray-600">
            No profiles in your shortlist.
          </h1>
        </div>
      ) : (

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 pt-5">
        {shortListProfiles?.map((profile) => (
          <div className="relative shadow-md rounded-lg cursor-pointer">
            <Link to={`/userprofile/${profile._id}`} key={profile._id}>
              <img
                src={profile.image}
                alt="Profile Image"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="h-32 p-4 bg-black bg-opacity-50 backdrop-blur text-white rounded-b-lg">
                <h1 className="text-xl font-semibold mb-1">
                  {profile.name} - {profile.gender}
                </h1>
                <h2 className="text-base font-semibold">{profile.age}</h2>
                <h5 className="text-base font-semibold">{profile.city}</h5>
              </div>
            </Link>
            <div className="p-4 pt-0  mt-2 bg-slate-400 shadow-md rounded-lg  ">
              <button
                className="w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center font-sans text-base  font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => ShortlistSubmission(profile._id)}
              >
                {" "}
                remove
              </button>
            </div>
          </div>
        ))}
      </div>
       )}
    </div>
    
  );
}

export default Shortlist;
