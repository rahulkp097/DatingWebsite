import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useAdminloginMutation } from '../../slices/adminApiSlice';
import { setCredentialsAdmin } from '../../slices/adminAuthSlice';
import { toast } from 'react-toastify'
import Loader from '../user/Loader';



function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    
  const navigate =useNavigate();
  const dispatch=useDispatch()

 const [login,{isLoading}]=useAdminloginMutation()

const { adminInfo } = useSelector((state) => state.adminAuth);
console.log("admin auth",adminInfo)

useEffect(()=>{
    if(adminInfo){
        navigate('/adminhome')
    }
 },[navigate,adminInfo])



 const handleLogin = async () => {
    if(email.trim()===''){
        toast.error("enter a valid username")
        return;
      }
      if(password.trim()===''){
        toast.error("enter a valid password")
        return;
      }
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
  
      if (res) {
        dispatch(setCredentialsAdmin({ ...res }));
        console.log('insde the function')
        navigate('/adminhome');
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      console.error(err); // Log the error to the console
  
      if (err.response && err.response.status === 401) {
        toast.error("Invalid email or password");
      } else if (err.response && err.response.status === 500) {
        toast.error("Server Issue");
      } else {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
