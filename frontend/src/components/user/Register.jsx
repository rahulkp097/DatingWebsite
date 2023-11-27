import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/userApiSlice";

import { toast } from "react-toastify";
import Loader from "./Loader";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const genderOptions = ["Male", "Female"];

  const navigate = useNavigate();

  const [EmailVerification, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (name === "") {
      toast.error("please enter your name");
    } else if (gender === "") {
      toast.error("please select your gender");
    } else if (password.length < 6) {
      toast.error("Password should be at least six letters");
    } else if (!specialCharacters.test(password)) {
      toast.error("Password should contain at least one special character");
    } else {
      try {
        const res = await EmailVerification({ email, name });
        const encodedPassword = encodeURIComponent(password);

        if (res.data.success) {
          toast.success(`OTP has been sent to ${email}`);
          navigate(
            `/otp?name=${name}&email=${email}&password=${encodedPassword}&gender=${gender}`
          );
        } else {
          return toast.error("The user already exists");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while registering. Please try again.");
      }
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.pexels.com/photos/1024984/pexels-photo-1024984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <Link to="/">
          <div className=" flex flex-col items-center">
            <img
              src="https://i.etsystatic.com/11917044/r/il/19576f/1308034468/il_794xN.1308034468_6mr7.jpg"
              className="rounded-full  w-36 h-36"
              alt=""
              srcSet=""
            />
          </div>
        </Link>
        <h1 className="text-2xl font-semibold ">Sign up</h1>

        <form onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Name
            </label>
            <div className="flex flex-col items-start">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <div className="flex flex-col  items-start">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Password
            </label>
            <div className="flex flex-col items-start">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Confirm Password
            </label>
            <div className="flex flex-col items-start">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="password_confirmation"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              {isLoading ? <Loader /> : "Register"}
            </button>
          </div>
        </form>

        {/* Sign up Link */}

        <div className="mt-6 text-blue-500 text-center">
          Already have an account? {"   "}
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
