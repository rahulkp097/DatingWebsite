import React, { useEffect, useId } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { useGetMatchListMutation } from '../../slices/userApiSlice';


const UserMatch = () => {
    const dispatch=useDispatch()
    const [matchListApi]=useGetMatchListMutation()

    const { userInfo } = useSelector((state) => state.auth);


    useEffect(()=>{
        getMatchList()
    },[])
    
    const getMatchList=async()=>{
        
        try {
            const userId = userInfo._id;
            
            const res = await matchListApi(userId).unwrap(); 
            console.log("response",res)
            if (res.success) {
             
                dispatch(setCredentials({ ...res.user.math }));
             
            }
          } catch (error) {
            console.log(error);
          }
    }
    


  return (
    <div className=" from-blue-50 to-violet-50 flex items-center justify-center lg:h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {/* Replace this with your grid items */}
          <div className="bg-white rounded-lg border p-4">
            <img
              src="https://placehold.co/300x200/d1d4ff/352cb5.png"
              alt="Placeholder Image"
              className="w-full h-48 rounded-md object-cover"
            />
            <div className="px-1 py-4">
              <div className="font-bold text-xl mb-2">Blog Title</div>
              <p className="text-gray-700 text-base">
                This is a simple blog card example using Tailwind CSS. You can replace this text with your own blog content.
              </p>
            </div>
            <div className="px-1 py-4">
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <img
              src="https://placehold.co/300x200/d1d4ff/352cb5.png"
              alt="Placeholder Image"
              className="w-full h-48 rounded-md object-cover"
            />
            <div className="px-1 py-4">
              <div className="font-bold text-xl mb-2">Blog Title</div>
              <p className="text-gray-700 text-base">
                This is a simple blog card example using Tailwind CSS. You can replace this text with your own blog content.
              </p>
            </div>
            <div className="px-1 py-4">
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <img
              src="https://placehold.co/300x200/d1d4ff/352cb5.png"
              alt="Placeholder Image"
              className="w-full h-48 rounded-md object-cover"
            />
            <div className="px-1 py-4">
              <div className="font-bold text-xl mb-2">Blog Title</div>
              <p className="text-gray-700 text-base">
                This is a simple blog card example using Tailwind CSS. You can replace this text with your own blog content.
              </p>
            </div>
            <div className="px-1 py-4">
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <img
              src="https://placehold.co/300x200/d1d4ff/352cb5.png"
              alt="Placeholder Image"
              className="w-full h-48 rounded-md object-cover"
            />
            <div className="px-1 py-4">
              <div className="font-bold text-xl mb-2">Blog Title</div>
              <p className="text-gray-700 text-base">
                This is a simple blog card example using Tailwind CSS. You can replace this text with your own blog content.
              </p>
            </div>
            <div className="px-1 py-4">
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
          {/* Add more items as needed */}
        </div>
      </div>
    </div>
  )
}

export default UserMatch