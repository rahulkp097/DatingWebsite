import React, { useEffect, useState } from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { useGetShortListProfilesMutation } from '../../slices/userApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../slices/authSlice'
import { Link } from 'react-router-dom'


function Shortlist() {
 const [shortListProfiles,setShortlistProfiles]=useState()
const {userInfo}=useSelector((state)=>state.auth)
const dispatch=useDispatch()
const [getShortlistProfileApi]=useGetShortListProfilesMutation()
useEffect(()=>{
    getShortListProfiles()
},[])

const getShortListProfiles=async ()=>{
    try {
            const userId=userInfo._id
           

            const res=await getShortlistProfileApi(userId).unwrap()

                if(res.success){
                    dispatch(setCredentials(res.user))
                    setShortlistProfiles(res.user.shortlist)
                }
    } catch (error) {
        console.log(error)
    }
}

console.log("shortlist",shortListProfiles)
return (
  
  
  
  <div className="container mx-auto p-4 lg:h-screen flex items-center justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Blog Entry 1 */}
      {shortListProfiles?.map((profile) => (
        <Link to={`/userprofile/${profile._id}`}>
      <div className="max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer">
        <img
          src={profile.image}
          alt="Image by Meriç Dağlı"
          className="w-full h-auto object-cover rounded-lg"
          />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg">
          <h1 className="text-2xl font-semibold">{profile.name} - ({profile.gender})</h1>
          <h1 className=" font-semibold">{profile.age}</h1>
          <h5 className=" font-semibold">{profile.city}</h5>
          <p className="mt-2">{profile.bio}</p>
        </div>
      </div>

          </Link>
        ))}

    </div>
  </div>







  )
}

export default Shortlist