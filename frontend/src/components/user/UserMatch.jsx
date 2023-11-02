import React, { useEffect, useId, useState } from 'react'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import { useDeleteMatchMutation, useGetMatchListMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';


const UserMatch = () => {
    const dispatch=useDispatch()
    const [matchListApi]=useGetMatchListMutation()
    const [matchList,setMatchList]=useState()
    const { userInfo } = useSelector((state) => state.auth);
    const [deleteMatchApi]=useDeleteMatchMutation()

    useEffect(()=>{
        getMatchList()
    },[])


    const deleteMatch = async (targetId) => {
      try {
        const userId = userInfo._id;
    
        const { value: confirmDelete } = await Swal.fire({
          title: 'Confirm Delete',
          text: 'Are you sure you want to delete this match?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#dc3545',
        });
    
        if (confirmDelete) {
          const res = await deleteMatchApi({ targetId, userId }).unwrap();
          console.log(res);
          if (res.success) {
            setMatchList(res.matchList);
            toast.success(res.message);
            getMatchList();
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    
    const getMatchList=async()=>{
        
        try {
            const userId = userInfo._id;
            
            const res = await matchListApi(userId).unwrap(); 
            console.log("response",res)
            if (res.success) {
                 setMatchList(res.matchList)
             
            }
          } catch (error) {
            console.log(error);
          }
    }
    


  return (
<div className="from-blue-50 to-violet-50 min-h-screen p-6">
  <div className="container mx-auto">
    <h1 className="text-3xl font-semibold text-center mb-6">Matches</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {matchList?.map((match) => (
        <div key={match?._id} className="bg-white text-black rounded-lg border text-center">
          <div className="flex items-center justify-center mt-2 "> {/* Center content */}
            <img
             src={match?.image || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
              alt="User Image"
              className="w-70 h-80 rounded-md object-cover"
            />
          </div>
          <div className="p-4">
              <p className="block font-sans text-base font-medium text-blue-gray-900 antialiased">
                {match?.name} - {match?.gender}
              </p>
              <p className="block font-sans text-base font-medium text-blue-gray-900 antialiased">
                {match?.age} years old, {match?.location}
              </p>
            </div>
          <div className="px-4 py-2">
            <button onClick={() => deleteMatch(match._id)} className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-950 rounded-lg focus:shadow-outline hover:bg-rose-700">Delete Match</button>
          </div>
        </div>

      ))}
    </div>
  </div>
</div>

  
  )
}

export default UserMatch