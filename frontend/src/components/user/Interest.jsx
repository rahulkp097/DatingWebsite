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
    <div className="flex flex-col h-screen w-full lg:flex-row">
    <div className="flex-grow card  rounded-box p-4">
      <h1 className="text-xl font-semibold">Interest Received</h1>
      <ul>
        {interestReceived?.map((user) => (
          <li key={user?._id} className="flex items-center space-x-4">
            <img src={user?.image} alt="User Photo" className="w-10 h-10 rounded-full" />
            <span>{user?.name}</span>
            <button onClick={() => acceptInterest(user._id)} className="btn btn-success">Accept</button>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex-grow card rounded-box p-4">
      <h1 className="text-xl font-semibold">Interest Sent</h1>
      <ul>
        {interestSend?.map((user) => (
          <li key={user?._id} className="flex items-center space-x-4 m-5">
            <img src={user?.image} alt="User Photo" className="w-10 h-10 rounded-full" />
            <span>{user?.name}</span>
            <button onClick={() => cancelInterest(user._id)} className="btn btn-primary">Cancel Request</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default Interest