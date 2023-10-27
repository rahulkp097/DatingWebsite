import React, { useEffect, useState } from 'react';
import { useCancelInterestRequestMutation, useGetHomeMutation, useSendInterestRequestMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';

const UserHomeProfileCards = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch=useDispatch()
  const { userInfo } = useSelector((state) => state.auth);
  const [getUserListApi, { isLoading }] = useGetHomeMutation();
  const [sendInterestApi]=useSendInterestRequestMutation()
  const [cancelInterestApi]=useCancelInterestRequestMutation()

  useEffect(() => {
    getUsertList();
  }, []);

  const getUsertList = async () => {
    try {
      let Id = userInfo._id;
      const res = await getUserListApi(Id).unwrap();

      if (res.success) {
        setUsers(res.sortedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isRequestSent = (targetId) => userInfo?.interestSend?.includes(targetId);

  
  const sendOrCancelRequest = async (targetId) => {
    const userId = userInfo._id;

    try {
      if (isRequestSent(targetId)) {
        
        const res=await cancelInterestApi({targetId,userId}).unwrap()
          console.log(res)
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




  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="relative mt-6 max-w-lg mx-auto ">
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

      <div className="grid gap-6  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {filteredUsers.map((profile, index) => (
          <div key={index} className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
              <img src={profile?.image} className="h-full w-full object-cover" alt="Profile Image" />
            </div>
            <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                {profile?.name} - {profile?.gender}
              </p>
              <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                {profile?.age} years old, {profile?.location}
              </p>
            </div>
            </div>
            <div className="p-6 pt-0">
              <button
                className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={()=>sendOrCancelRequest(profile._id)}
              >
                {isRequestSent(profile._id) ? 'Cancel Request' : 'Send Request'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserHomeProfileCards;
