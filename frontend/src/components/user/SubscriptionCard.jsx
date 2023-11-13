import React, { useEffect, useState } from "react";
import { useGetSubscripctionDataMutation, usePucharsesubscripctionMutation } from "../../slices/userApiSlice";


import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";

import ExpirydateComponent from "./ExpirydateComponent";
import { setSubscriptionsPlans } from "../../slices/SubscripctionSlice";

function SubscriptionCard() {
const [subscriptionList,setSubscriptionList]=useState()
const [getSubscripctionAPi,{isLoading}]=useGetSubscripctionDataMutation()
const [purchasePlanApi]=usePucharsesubscripctionMutation()
const dispatch=useDispatch()
const { userInfo } = useSelector((state) => state.auth);

useEffect(()=>{
  getSubscriptionlist()
},[userInfo])




  const getSubscriptionlist=async()=>{
    const userId=userInfo?._id
    
    try {
      const res=await getSubscripctionAPi(userId).unwrap()
   
     
        setSubscriptionList(res.subscriptionList)
      

    } catch (error) {
      console.log(error)
    }
  }


  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const SubmitPayment = async(planId,amount,planName) => {
   
    const userId=userInfo?._id
    const key = "rzp_test_MD3Erjq5yf5E59"
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    const options = {
      key: key,
      amount: amount * 100, // Amount in smallest currency unit (e.g., paise in INR)
      currency: "INR",
      name: "You&Me",
      description: "Payment for the subscripction",
      handler: async function (response) {
        if (response.razorpay_payment_id) {
        
          
          const res=await purchasePlanApi({planId,userId}).unwrap()
  
          dispatch(setCredentials({ ...res.user }));
          getSubscriptionlist()
          toast.success(res.message)
        } else {
          
          toast.error("Payment failed or canceled.");
        
        }
      },
      prefill: {
        name: userInfo?.name,
        email: userInfo?.email
       
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  };
      


  
  return (
    <div className="min-h-screen">
  <h1 className="text-3xl font-semibold text-center mt-6">
        Subscription Plans
      </h1>

    <div className="flex items-center justify-center h-screen">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
      {subscriptionList?.map((plan,index) => (
        <div
          key={plan._id} // Make sure to use a unique key for each plan
          className={`relative flex w-full max-w-[20rem] flex-col rounded-xl ${index % 2 === 0 ? 'bg-gradient-to-tr from-pink-600 to-pink-400' : 'bg-gradient-to-tr from-blue-600 to-blue-400'} bg-clip-border p-8 text-white shadow-md shadow-pink-500/40`}
        >
          <div className="relative m-0 mb-8 overflow-hidden rounded-none border-b border-white/10 bg-transparent bg-clip-border pb-8 text-center text-gray-700 shadow-none">
            <p className="block font-sans text-sm font-normal uppercase leading-normal text-white antialiased">
              {plan.name}
            </p>
            <h1 className="mt-6 flex justify-center gap-1 font-sans text-7xl font-normal tracking-normal text-white antialiased">
              <span className="mt-2 text-4xl">Rs.{plan.price}</span>
              <span className="self-end text-4xl">/mo</span>
            </h1>
          </div>
          <div className="p-0">
            <ul className="flex flex-col gap-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-3 w-3"
                      >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                  </span>
                  <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {userInfo?.subscription?.planName !== plan.name && (
  <>
    <button
      className="block w-full select-none rounded-lg mt-4 mb-2 bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-pink-500 shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none"
      type="button"
      data-ripple-dark="true"
      onClick={() => SubmitPayment(plan?._id, plan?.price, plan?.name)}
    >
      Buy Now
    </button>
  </>
)}
{userInfo?.subscription?.planName === plan.name && (
  <>
    <button
      className="block w-full select-none rounded-lg mt-2 mb-2 bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-gray-500 shadow-md cursor-not-allowed"
      type="button"
      data-ripple-dark="true"
      disabled
    >
      Purchased
    </button>
    <h1 className="text-xs font-semibold mt-2 text-center ">
            Your Plan Expire in
            <ExpirydateComponent expirationDate={userInfo?.subscription?.expirationDate} />
          </h1>
  </>
)}

        </div>
      ))}
    </div>
  </div>
  
      </div>
  );
}

export default SubscriptionCard;
