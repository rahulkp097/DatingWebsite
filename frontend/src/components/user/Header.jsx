import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const userInfoStr = localStorage.getItem('userInfo');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;

  const logoutHandler = async () => {
    try {
      dispatch(logout());
      const res = await logoutApiCall().unwrap();
      navigate('/login');
      if (res) {
        toast.success("Logout Successfully");
      } else {
        toast.error("Logout Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-neutral">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost normal-case text-xl">
        <img
          src="/logoi.jpg" // Replace with your image path
          alt="You&Me Logo"
          className="w-10 h-10 rounded-full mr-2" // Adjust the size as needed
        />
        You&Me
      </Link>
    </div>
  
    {userInfo && (
      <div className="hidden md:block flex space-x-4">
        <Link to="/profile" className="hover:underline">
          Profile
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
        <Link to="/chat" className="hover:underline">
          Chat
        </Link>
      </div>
    )}
  
    {userInfo && (
      <div className="dropdown dropdown-end ml-5">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              src={userInfo?.image || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
              alt="User Avatar"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {window.innerWidth < 768 /* Add your desired breakpoint here */ ? (
            <>
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
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
              <li>
                <Link to="/chat" className="justify-between">
                  Chat
                </Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    )}
  </div>
  
  );
};

export default Header;
