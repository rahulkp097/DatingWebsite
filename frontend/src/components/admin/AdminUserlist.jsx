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
     <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Users</h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select className="...">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <div className="..."></div>
            </div>
            <div className="relative">
              <select className="...">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="..."></div>
            </div>
          </div>
          <div className="block relative">
            <span className="..."></span>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SL NO.
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                
                {filteredUserData.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{index + 1}</td>
               
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={user.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{user.location}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{user.createdAt}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span onClick={() => userToggle(user._id)}  className="relative">{user.isActive ? 'Active' : 'Inctive'}</span>
                    </span>
                  </td>
                </tr>
                ))}
                {/* Additional rows go here */}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminUserlist;
