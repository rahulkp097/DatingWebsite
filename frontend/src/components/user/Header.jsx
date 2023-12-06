import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { selectSearchQuery, setSearchQuery } from "../../slices/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const searchQuery = useSelector(selectSearchQuery);
  const { userInfo } = useSelector((state) => state.auth);

  const handleSearchQueryChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
  };

  const logoutHandler = async () => {
    try {
      dispatch(logout());
      const res = await logoutApiCall().unwrap();
      navigate("/login");
      if (res) {
        toast.success("Logout Successfully");
      } else {
        toast.error("Logout Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headerStyles = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  };

  return (
    <div
      className={
        isHomePage && searchQuery
          ? "navbar bg-slate-300 mb-5"
          : "navbar bg-slate-300"
      }
      style={isHomePage && searchQuery ? headerStyles : null}
    >
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img
            src="/logoi.jpg" // Replace with your image path
            alt="You&Me Logo"
            className="w-10 h-10 rounded-full mr-2" // Adjust the size as needed
          />
          <span className="hidden sm:block">You&Me</span>
        </Link>
      </div>

      {userInfo && (
        <>
          {isHomePage && (
            <div className="max-w-lg mx-auto m-4 md:ml-3 md:mr-auto">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg
                    className=" text-gray-500"
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
                  className="w-full bg-slate-200 border rounded-md pl-6 pr-2 py-2 focus:border-black focus:outline-none focus:shadow-outline text-sm" // Adjusted padding and font size
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                />
              </div>
            </div>
          )}

          <div className="md:hidden block">
            <details className="dropdown">
              <summary tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      userInfo?.image ||
                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </summary>
              <ul className="p-2 shadow menu dropdown-content mt-3 z-[1] bg-base-100 rounded-box w-52 right-0">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/shortlists" className="justify-between">
                    Shortlist
                  </Link>
                </li>
                <li>
                  <Link to="/interests" className="justify-between">
                    Interests
                  </Link>
                </li>
                <li>
                  <Link to="/matches" className="justify-between">
                    Matches
                  </Link>
                </li>
                <li>
                  <Link to="/subscriptions" className="justify-between">
                    Subscriptions
                  </Link>
                </li>
                {userInfo?.subscription ? (
                  <li>
                    <Link to="/chat" className="justify-between">
                      Chat
                    </Link>
                  </li>
                ) : (
                  <li>
                    <button
                      onClick={() => {
                        // Show toast indicating the need for a subscription plan
                        toast.error(
                          "You need a subscription plan to access Chat."
                        );
                      }}
                      className="justify-between"
                    >
                      Chat
                    </button>
                  </li>
                )}
                <li>
                  <button onClick={() => logoutHandler()}>Logout</button>
                </li>
              </ul>
            </details>
          </div>

          <div className="hidden md:flex space-x-4 ml-4">
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <Link to="/shortlists" className="hover:underline">
              Shortlist
            </Link>
            <Link to="/interests" className="hover:underline">
              Interests
            </Link>
            <Link to="/matches" className="hover:underline">
              Matches
            </Link>
            <Link to="/subscriptions" className="hover:underline">
              Subscriptions
            </Link>

            {userInfo?.subscription ? (
              <Link to="/chat" className="hover:underline">
                Chat
              </Link>
            ) : (
              <button
                onClick={() => {
                  // Show toast indicating the need for a subscription plan
                  toast.error("You need a subscription plan to access Chat.");
                }}
                className="justify-between"
              >
                Chat
              </button>
            )}

            <details className="dropdown">
              <summary tabIndex={0} className="btn  btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      userInfo?.image ||
                      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </summary>
              <ul className="shadow menu dropdown-content mt-3 z-[1]  rounded-box right-0">
                <li>
                  <button
                    onClick={() => logoutHandler()}
                    className=" bg-red-400  hover:btn-error "
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
