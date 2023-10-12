import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
const Header = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [logoutApiCall]=useLogoutMutation();
 


  const userInfoStr = localStorage.getItem('userInfo');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  console.log(typeof userInfo)
console.log("userInfo",userInfo)



  const logoutHandler= async()=>{

    try {
     
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-teal-300">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
          <Link to="/" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
            You&Me
          </Link>
          <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button>
        </div>
        <div className="lg:flex flex-grow items-center">
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
          {userInfo ? (
<div>

<li className="nav-item">
<span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white">
  Welcome, {userInfo?.name} 

</span>
</li>

  <button onClick={logoutHandler}>Logout</button>
  <Link to='/profile'>Profile</Link>
</div>
          ) : (

            <>
            <li className="nav-item">
              
            <Link to="/login" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
              Register
            </Link>
          </li>
            </>
          )}
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
