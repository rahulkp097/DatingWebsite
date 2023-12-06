import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGoogleAuthLoginMutation,
  useLoginMutation,
} from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleLoginApi, { isLoading: isLoadingGoogleAuth }] =
    useGoogleAuthLoginMutation();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.isActive) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (res.notActive) return toast.warning(res.message);
      if (res.success) {
        dispatch(setCredentials({ ...res.user }));
      } else toast.error("login failed");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const responseMessage = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      console.log(decoded);
      const name = decoded.name;
      const email = decoded.email;
      const image = decoded.picture;

      const res = await googleLoginApi({ name, email, image }).unwrap();

      if (res.notActive) return toast.warning(res.message);
      if (res.success) {
        dispatch(setCredentials({ ...res.user }));
      } else toast.error("login failed");
    } catch (error) {
      console.log(error);
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.pexels.com/photos/5971184/pexels-photo-5971184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <Link to="/">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="https://i.etsystatic.com/11917044/r/il/19576f/1308034468/il_794xN.1308034468_6mr7.jpg"
              className="rounded-full  w-36 h-36"
              alt=""
              srcSet=""
            />
          </div>
        </Link>
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form action="#" onSubmit={submitHandler}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* Remember Me Checkbox */}

          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <Link to="/forgotpassword" className="hover:underline">
              Forgot Password?
            </Link>
          </div>
          {/* Login Button */}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {isLoading || isLoadingGoogleAuth ? <Loader /> : "Login"}
          </button>
        </form>

        <div className="mt-6 text-blue-500 text-center flex justify-center items-center ">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>

        {/* Sign up Link */}

        <div className="mt-6 text-blue-500 text-center">
          <Link to="/register" className="hover:underline">
            Sign up Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
