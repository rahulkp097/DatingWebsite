import React, { useEffect, useId, useState } from "react";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import {
  useDeleteMatchMutation,
  useGetMatchListMutation,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserMatch = () => {
  const dispatch = useDispatch();
  const [matchListApi] = useGetMatchListMutation();
  const [matchList, setMatchList] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteMatchApi] = useDeleteMatchMutation();

  useEffect(() => {
    getMatchList();
  }, []);

  const deleteMatch = async (targetId) => {
    try {
      const userId = userInfo._id;

      const { value: confirmDelete } = await Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this match?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#dc3545",
      });

      if (confirmDelete) {
        const res = await deleteMatchApi({ targetId, userId }).unwrap();
        console.log(res);
        if (res.success) {
          setMatchList(res.matchList);
          toast.success(res.message);
          getMatchList();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMatchList = async () => {
    try {
      const userId = userInfo._id;

      const res = await matchListApi(userId).unwrap();
      console.log("response", res);
      if (res.success) {
        setMatchList(res.matchList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
  <div className="container mx-auto">
    <h1 className="text-4xl font-bold text-center mb-8 text-black">Your Matches</h1>

    {matchList?.length === 0 ? (
      <div className="flex items-center justify-center h-64">
        <h1 className="text-3xl font-semibold text-gray-600">
          You don't have any matches.
        </h1>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5">
        {matchList?.map((match) => (
          <div key={match?._id} className="bg-blue-100 text-black rounded-s-3xl border overflow-hidden shadow-md">
            <Link to={`/userprofile/${match._id}`} key={match._id}>
              <div className="flex items-center justify-center mt-4">
                <img
                  src={match?.image || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}
                  alt="User Image"
                  className="h-72  object-cover rounded-full"
                />
              </div>
            </Link>
            <div className="p-4">
              <p className="block text-lg font-semibold text-blue-gray-900">
                {match?.name} - {match?.gender}
              </p>
              <p className="block text-sm font-medium text-blue-gray-600">
                {match?.age} years old, {match?.location}
              </p>
            </div>
            <div className="p-4 flex items-center justify-center">
              <button
                onClick={() => deleteMatch(match._id)}
                className="px-4 py-2 text-white transition-colors duration-300 bg-red-500 rounded-full hover:bg-emerald-500 focus:outline-none"
              >
                Delete Match
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default UserMatch;
