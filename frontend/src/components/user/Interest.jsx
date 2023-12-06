import React, { useEffect, useState } from "react";
import {
  useAcceptInterestRequestMutation,
  useCancelInterestRequestMutation,
  useCancelReceivedInterestRequestMutation,
  useGetInterestLIstMutation,
} from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";
import { Link } from "react-router-dom";

function Interest() {
  const [interestSend, setInterestSend] = useState();
  const [interestReceived, setInterestReceived] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const [getInterestListApi] = useGetInterestLIstMutation();
  const [cancelInterestApi] = useCancelInterestRequestMutation();
  const [cancelReceviedInterestAPi] =
    useCancelReceivedInterestRequestMutation();
  const dispatch = useDispatch();
  const [acceptInterestApi] = useAcceptInterestRequestMutation();
  useEffect(() => {
    getInterestList();
  }, []);

  const getInterestList = async () => {
    try {
      const userId = userInfo._id;
      const res = await getInterestListApi(userId).unwrap();

      if (res.success) {
        setInterestReceived(res.interestReceived);
        setInterestSend(res.interestSend);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const acceptInterest = async (targetId) => {
    try {
      const userId = userInfo._id;

      const res = await acceptInterestApi({ targetId, userId }).unwrap();

      if (res.success) {
        dispatch(setCredentials({ ...res.user }));
        toast.success(res.message);
        getInterestList();
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
        getInterestList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelInterest = async (targetId) => {
    try {
      const userId = userInfo?._id;

      const res = await cancelInterestApi({ targetId, userId }).unwrap();

      if (res.success) {
        dispatch(setCredentials({ ...res.user }));
        toast.success(res.message);
        getInterestList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200  p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="card rounded-box bg-base-200 p-5">
          <h1 className="text-xl font-semibold text-center">
            Interest Received ({interestReceived?.length})
          </h1>
          {interestReceived?.length === 0 ? (
            <div className="flex items-center justify-center  h-64">
              <h1 className="text-3xl font-semibold text-gray-600">
                No interest received.
              </h1>
            </div>
          ) : (
            <ul>
              {interestReceived?.map((user) => (
                <li key={user?._id} className="flex items-center space-x-4 m-5">
                  <Link to={`/userprofile/${user?._id}`} key={user?._id}>
                    <img
                      src={
                        user?.image ||
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                      }
                      alt="User Photo"
                      className="w-20 h-20 rounded-full"
                    />
                  </Link>
                  <span>{user?.name}</span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => acceptInterest(user?._id)}
                      className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => cancelReceviedInterest(user?._id)}
                      className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card rounded-box bg-base-200 p-5">
          <h1 className="text-xl font-semibold text-center">
            Interest Sent ({interestSend?.length})
          </h1>
          {interestSend?.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <h1 className="text-3xl font-semibold text-gray-600">
                No interest sent.
              </h1>
            </div>
          ) : (
            <ul>
              {interestSend?.map((user) => (
                <li key={user?._id} className="flex items-center space-x-4 m-5">
                  <Link to={`/userprofile/${user?._id}`} key={user?._id}>
                    <img
                      src={
                        user?.image ||
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                      }
                      alt="User Photo"
                      className="w-20 h-20 rounded-full"
                    />
                  </Link>
                  <span>{user?.name}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => cancelInterest(user?._id)}
                      className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interest;
