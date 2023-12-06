import React, { useEffect, useState } from "react";
import {
  useAdminFetchDataMutation,
  useAdminUserActionMutation,
  useGetUserActivityMutation,
} from "../../slices/adminApiSlice";
import Loader from "../user/Loader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AdminUserlist() {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All"); // Default to 'All'
  const [adminFetchData, { isLoading }] = useAdminFetchDataMutation();
  const [userAction] = useAdminUserActionMutation();
  const [getUserActivityApi, { isLoading: isLoadingActivity }] =
    useGetUserActivityMutation();
  const [userActivities, setUserActivities] = useState();
  const userToggle = async (userId) => {
    try {
      const userToToggle = userData.find((user) => user._id === userId);

      let confirmMessage = "";

      if (userToToggle.isActive) {
        confirmMessage = "Are you sure you want to block this User?";
      } else {
        confirmMessage = "Are you sure you want to unblock this User?";
      }

      const { value: confirmToggle } = await Swal.fire({
        title: "Confirm Toggle",
        text: confirmMessage,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#",
      });

      if (confirmToggle) {
        const res = await userAction({ userId }).unwrap();

        if (res.success) {
          setUserData((prevUserData) =>
            prevUserData.map((user) =>
              user._id === userId ? { ...user, isActive: !user.isActive } : user
            )
          );
        }
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
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
      console.error("Error fetching data:", error);
    }
  }

  const filteredUserData = userData.filter((user) => {
    const userString = user.name.toLowerCase() + user.email.toLowerCase();

    if (filter === "Active" && !user.isActive) {
      return false;
    } else if (filter === "Inactive" && user.isActive) {
      return false;
    }

    return userString.includes(searchQuery.toLowerCase());
  });

  const viewUserActivity = async (userId) => {
    try {
      const res = await getUserActivityApi(userId).unwrap();

      if (res.success) {
        setUserActivities(res.userActivity);
      }

      document.getElementById("my_modal_5").showModal();
    } catch (error) {
      console.error("Error viewing user activity:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  className="inline-flex items-center  text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="..."></div>
              </div>
              {/* <div className="relative">
                <select className="...">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="..."></div>
              </div> */}
            </div>
            <div className="max-w-md mx-auto">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-900 overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  className="peer h-full w-full outline-none bg-slate-700 text-sm text-white pr-2"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 bg py-4 overflow-x-auto">
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
                      Location
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Activities
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserData.map((user, index) => (
                    <tr key={user._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">
                        {index + 1}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={
                                user.image ||
                                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                              }
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.city}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          className="btn"
                          onClick={() => viewUserActivity(user._id)}
                        >
                          View
                        </button>{" "}
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${
                              user.isActive ? "bg-green-200" : "bg-red-200"
                            } opacity-50 rounded-full`}
                          ></span>
                          <span
                            onClick={() => userToggle(user._id)}
                            className={`relative cursor-pointer ${
                              user.isActive ? "text-green-900" : "text-red-900"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box h-80 overflow-y-auto">
                  <h3 className="font-bold text-lg">User Activities</h3>
                  <div className="py-4">
                    {userActivities?.length > 0 ? (
                      userActivities?.map((activity, index) => (
                        <div key={index} className="mb-2">
                          <p className="font-bold">
                            Activity: {activity.activityType}
                          </p>
                          <p>{activity.activity}</p>
                          <p className="text-gray-500">
                            Time:{" "}
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No activities found.</p>
                    )}
                  </div>

                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
              {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing {filteredUserData.length} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-300 hover-bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-300 hover-bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUserlist;
