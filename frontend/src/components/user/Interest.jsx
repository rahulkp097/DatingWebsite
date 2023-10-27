import React, { useEffect, useState } from 'react'
import { useAcceptInterestRequestMutation, useCancelInterestRequestMutation, useGetInterestLIstMutation } from '../../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'





function Interest() {
  const [interestSend,setInterestSend]=useState()
  const [interestReceived,setInterestReceived]=useState()
  const { userInfo } = useSelector((state) => state.auth);
  const [getInterestListApi] = useGetInterestLIstMutation();
  const [cancelInterestApi]=useCancelInterestRequestMutation()
  const dispatch=useDispatch()
  const [acceptInterestApi]=useAcceptInterestRequestMutation()
  useEffect(() => {
    getInterestList();
  }, []);

  const getInterestList = async () => {
    try {
      const userId = userInfo._id;
      const res = await getInterestListApi(userId).unwrap(); 
      
      if (res.success) {
        
        setInterestReceived(res.interestReceived)
        setInterestSend(res.interestSend)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const acceptInterest=async(targetId)=>{
    try {
      const userId=userInfo._id
      
      const res=await acceptInterestApi({targetId,userId}).unwrap()
      console.log(res)
    if (res.success) {
      dispatch(setCredentials({ ...res.user }));
      toast.success(res.message);
      getInterestList();
    }

    } catch (error) {
     
      console.log(error)
    }

  }

  const cancelInterest=async(targetId)=>{
    

    try {
      const userId=userInfo._id
      
      const res=await cancelInterestApi({targetId,userId}).unwrap()
      console.log(res)
    if (res.success) {
      dispatch(setCredentials({ ...res.user }));
      toast.success(res.message);
      getInterestList();
    }

    } catch (error) {
     
      console.log(error)
    }
  }

  return (
    <div className='h-screen '>

    <div className="grid grid-cols-2 gap-4 m-5 h-3/4">
  <div className="card rounded-box bg-base-200 p-5">
    <h1 className="text-xl font-semibold text-center">Interest Received</h1>
    <ul>
      {interestReceived?.map((user) => (
        <li key={user?._id} className="flex items-center space-x-4 m-5">
          <img src={user?.image} alt="User Photo" className="w-10 h-10 rounded-full" />
          <span>{user?.name}</span>
          <button onClick={() => acceptInterest(user._id)} className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-950 rounded-lg focus:shadow-outline hover:bg-blue-700 ">Accept</button>
        </li>
      ))}
    </ul>
  </div>

  <div className="card rounded-box bg-base-200 p-5">
    <h1 className="text-xl font-semibold text-center">Interest Sent</h1>
    <ul>
      {interestSend?.map((user) => (
        <li key={user?._id} className="flex items-center space-x-4 m-5">
          <img src={user?.image} alt="User Photo" className="w-10 h-10 rounded-full" />
          <span>{user?.name}</span>
          <button onClick={() => cancelInterest(user._id)} className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-950 rounded-lg focus:shadow-outline hover:bg-rose-700">Cancel Request</button>
        </li>
      ))}
    </ul>
  </div>
</div>

      </div>
  )
}

export default Interest