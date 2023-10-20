import React, { useEffect, useState } from 'react';
import { useAdminFetchDataMutation, useAdminUserActionMutation } from '../../slices/adminApiSlice';
import Loader from '../user/Loader';
import { toast } from 'react-toastify';

function AdminUserlist() {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminFetchData, { isLoading }] = useAdminFetchDataMutation();
  const [userAction] = useAdminUserActionMutation();

  const userToggle = async (userId) => {
    try {
      const res = await userAction({ userId }).unwrap();

      if (res.success) {
        setUserData((prevUserData) =>
          prevUserData.map((user) =>
            user._id === userId ? { ...user, isActive: !user.isActive } : user
          )
        );
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  async function callApi() {
    try {
      const response = await adminFetchData().unwrap();

      const myData = response.users;
      setUserData(myData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const filteredUserData = userData.filter((user) => {
    const userString = user.name.toLowerCase() + user.email.toLowerCase(); // Add other properties to search if needed
    return userString.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="relative m-5 max-w-lg mx-auto ">
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
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col justify-center items-center ">
        {filteredUserData.length === 0 ? (
          <p>No results found</p>
        ) : (
          <table className="table bg-primary-content">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserData.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-20 h-20">
                          <img src={user.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => userToggle(user._id)}
                      className={`btn btn-ghost btn-xs ${user.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} p-2 m-1`}
                    >
                      {user.isActive ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AdminUserlist;
