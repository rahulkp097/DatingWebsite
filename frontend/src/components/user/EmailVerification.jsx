import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOTPMutation } from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

function EmailVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]); // Initialize OTP state with an array of 4 empty strings
  const location = useLocation();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const gender = searchParams.get("gender");

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];


  const otpSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");


    try {
      const response = await verifyOTP({
        name,
        email,
        password,
        enteredOTP,
        gender,
      });
      console.log(response);
      if (response.data.success) {
        toast.success("OTP verification Successfully");
        console.log("User created:", response.newUser);
        navigate("/login");
      } else {
        toast.error("OTP verification failed:", response.message);
      }
    } catch (error) {
      toast.error("An error occurred:", error);
    }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;

    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field, if available
      if (value === "" && index > 0 && inputRefs[index - 1].current) {
        inputRefs[index - 1].current.focus();
      } else if (index < inputRefs.length - 1 && inputRefs[index + 1].current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-black">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-black">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={otpSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {otp.map((digit, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        ref={inputRefs[index]}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-slate-500 focus:bg-gray-500 focus:ring-1 ring-blue-700"
                        type="text"
                        name={`otp-${index}`}
                        value={digit}
                        maxLength="1"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                  >
                    Verify Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
