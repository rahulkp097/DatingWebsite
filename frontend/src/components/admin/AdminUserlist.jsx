import React, { useEffect, useState } from 'react';
import { useAdminFetchDataMutation } from '../../slices/adminApiSlice';
import Loader from '../user/Loader';

function AdminUserlist() {
    const [userData, setUserData] = useState([]);
    const [adminFetchData, isLoading] = useAdminFetchDataMutation();

    console.log("userDataState",userData)
    useEffect(() => {
        callApi();
    }, [ ]);

    async function callApi() {
        try {
            const response = await adminFetchData().unwrap();
    
            const myData = response.users; 
            
            setUserData(myData)
           
        } catch (error) {
            // Handle errors here, e.g., display an error message.
            console.error('Error fetching data:', error);
        }
    }


  return (
    <div className='bg-blue-200 h-screen flex flex-col justify-center items-center'>
    <h1 className='text-2xl font-bold mb-4'>Admin User List</h1>
    <table className='border-collapse border w-1/2'>
      <thead>
        <tr>
          <th className='border p-2'>Username</th>
          <th className='border p-2'>Email</th>
          <th className='border p-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!userData ?(<Loader/>) :(
            <>
       
        {userData?.map((user) => (
          <tr key={user.id}>
            <td className='border p-2'>{user.name}</td>
            <td className='border p-2'>{user.email}</td>
            <td className='border p-2'>
              <button className='bg-green-500 text-white p-2 m-1'>Unblock</button>
              <button className='bg-red-500 text-white p-2 m-1'>Block</button>
            </td>
          </tr>
        ))}
             </>
        )}
      </tbody>
    </table>
  </div>
  )
}

export default AdminUserlist