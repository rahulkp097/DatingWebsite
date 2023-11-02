import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAddToShortListMutation, useGetTargetUserProfileMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';




const UserProfilePage = () => {
  const [userData,setUserData]=useState()
  const dispatch=useDispatch()
  const { userInfo } = useSelector((state) => state.auth);


  useEffect(()=>{
    getUserProfileData()
  },[])


const [userProfileDataApi]=useGetTargetUserProfileMutation()

const [userShortListApi]=useAddToShortListMutation()


const {userId}=useParams()
const getUserProfileData= async()=>{
  


  try {
    const user=  userInfo._id
  
    const res = await userProfileDataApi({ userId, user }).unwrap();

    setUserData(res.data)
    
    dispatch(setCredentials(res.user));
    
  } catch (error) {
    
    console.log(error)
  }

}


const ShortlistSubmission=async()=>{

try {
  const userId=userInfo._id
  const targetId=userData._id
  
  const res=await userShortListApi({userId,targetId}).unwrap()
  if(res.success){
   
    getUserProfileData()
    toast.success(res.message);
  }
  
} catch (error) {
  console.log(error)
}
}


  return (
    <div className="container">
    <div className="main-body">
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="flex flex-col items-center text-center">
                <img src={userData?.image || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} alt="user" className="rounded-circle p-1 bg-primary  h-56"  />
                <div className="mt-3  ">
                  <h4>{userData?.name}</h4>
              
                  <button onClick={ShortlistSubmission} className="btn btn-primary">
  {userInfo?.shortlist?.includes(userData?._id) ? 'Shortlisted' : 'Shortlist'}
</button>

                  <button className="btn btn-outline-primary">Message</button>
                </div>
              </div>
              <hr className="my-4" />
              <div className="overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-slate-400">
           Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This is some information about the user.
        </p>
      </div>
      <div className="border-t  px-4 py-5 sm:p-0">
        <dl className="sm:divide-y ">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Full name
            </dt>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
              {userData?.name}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
             Age
            </dt>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
              {userData?.age}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
             Gender
            </dt>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
              {userData?.gender}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Email address
            </dt>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
              {userData?.email}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Location
            </dt>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
              {userData?.location}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              bio
            </dt>
            <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
              {userData?.bio}
            </dd>
          </div>
        </dl>
      </div>
    </div>
            </div>
          </div>
        </div>


        
  
      </div>
    </div>
  </div>
  )
}

export default UserProfilePage