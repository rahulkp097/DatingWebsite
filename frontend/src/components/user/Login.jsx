import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useLoginMutation } from '../../slices/userApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from './Loader'
function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const navigate =useNavigate();
  const dispatch=useDispatch()

 const [login,{isLoading}]=useLoginMutation()

 const {userInfo}=useSelector((state)=>state.auth)

 useEffect(()=>{
    if(userInfo){
        navigate("/")
    }
 },[navigate,userInfo])


  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
        const res=await login ({email,password}).unwrap()
        console.log(res)
        if(res.name){
        dispatch(setCredentials({...res}))
        navigate("/")}
    else   toast.error("login failed")
    } catch (err) {
        toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
            Sign in
        </h1>
        <form className="mt-6" onSubmit={submitHandler}>
            <div className="mb-2">
            <label
    htmlFor="email"
    className="block text-sm font-semibold text-gray-800"
>
    Email
</label>
<input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    type="email"
    id="email" 
    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
/>

<label
    htmlFor="password"
    className="block text-sm font-semibold text-gray-800"
>
    Password
</label>
<input
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type="password"
    id="password" 
    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
/>

            </div>
            <Link
                to="#"
                className="text-xs text-purple-600 hover:underline"
            >
                Forget Password?
            </Link>
            {isLoading && <Loader/>}
            <div className="mt-6">
                <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Login
                </button>
            </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div className="flex mt-4 gap-x-2">
            <button
                type="button"
                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
            </button>
            
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <Link
                to="/register"
                className="font-medium text-purple-600 hover:underline"
            >
                Sign up
            </Link>
        </p>
    </div>
</div>
  )
}

export default Login