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
    <div className="min-h-screen ">
      <div className="grid grid-cols-2 gap-4 m-5 h-3/4">
        <div className="card rounded-box bg-base-200 p-5">
          <h1 className="text-xl font-semibold text-center">
            Interest Received ({interestReceived?.length})
          </h1>
          <ul>
            {interestReceived?.map((user) => (
              <li key={user?._id} className="flex items-center space-x-4 m-5">
                <Link to={`/userprofile/${user?._id}`} key={user?._id}>
                  <img
                    src={user?.image}
                    alt="User Photo"
                    className="w-20 h-20 rounded-full"
                  />
                </Link>
                <span>{user?.name}</span>

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
              </li>
            ))}
          </ul>
        </div>

        <div className="card rounded-box bg-base-200 p-5">
          <h1 className="text-xl font-semibold text-center">
            Interest Sent ({interestSend?.length})
          </h1>
          <ul>
            {interestSend?.map((user) => (
              <li key={user?._id} className="flex items-center space-x-4 m-5">
                <Link to={`/userprofile/${user?._id}`} key={user?._id}>
                  <img
                    src={user?.image}
                    alt="User Photo"
                    className="w-20 h-20 rounded-full"
                  />
                </Link>
                <span>{user?.name}</span>
                <button
                  onClick={() => cancelInterest(user?._id)}
                  className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Interest;
