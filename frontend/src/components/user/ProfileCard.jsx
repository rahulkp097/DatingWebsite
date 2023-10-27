import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useUpdateUserProfilePhotoMutation, useUploadPhotoToCloudinaryMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';

import { useUpdateProfileMutation } from '../../slices/userApiSlice';
import Loader from './Loader';


function ProfileCard() {
  const [image, setImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [uploadImageApi, { isLoading }] = useUpdateUserProfilePhotoMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [cloudinaryApi] = useUploadPhotoToCloudinaryMutation();
  const dispatch = useDispatch();

  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setUploadedImageURL(URL.createObjectURL(selectedImage));
    console.log("Selected image:", selectedImage);
  };


  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const [profileUpdate] = useUpdateProfileMutation();




  const openModal = () => {
    setIsModalOpen(true);
    modalRef.current.showModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    modalRef.current.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
    try {
      const res = await profileUpdate({ name, age, bio,location, userInfo }).unwrap();

      if (res.success) {
        console.log('Profile updated successfully');
        dispatch(setCredentials(res.user));
        toast.success("Profile updated successfully");
        closeModal();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };



  
  const onSubmit = async () => {
    if (!image) {
      toast.error('Please select an image to update your profile photo.');
      return;
    }

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'datingWebsite');
    data.append('cloud_name', 'dzwiqrzng');
   
    try {
     
      const response = await cloudinaryApi(data ).unwrap();
     
      if (response.url) {
       const imageUrl=response.url
      const userId=userInfo._id
       const res=await uploadImageApi({imageUrl,userId}).unwrap()
       console.log("res",res)
       if(res.success){

         dispatch(setCredentials(res.user))
         toast.success('Profile photo updated successfully');
         closeModal();
        }
      } else {
        
        toast.error('Failed to update profile photo');
      }
    } catch (error) {

      console.error('Error updating profile photo:', error);
      toast.error('An error occurred while updating the profile photo');
    }
  };

  return (

    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row ">
    <img
  src={userInfo?.image || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
  className="max-w-sm rounded-lg shadow-2xl mx-4 lg:mx-0"
  alt="User Image"
/>

      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold text-primary mb-4">{userInfo?.name}</h1>
        <h1 className="text-3xl font-bold text-info mb-4">{userInfo?.gender}</h1>
        <h3 className="text-3xl font-semibold text-accent mb-4">{userInfo?.age ? `${userInfo.age} years old` : ""}</h3>
        <h1 className="text-xl font-semibold text-base-600 mb-4">{userInfo?.email}</h1>
        <h4 className="text-base-600 text-lg my-6">{userInfo?.location}</h4>
        <p className="text-base-600 text-lg my-6">{userInfo?.bio}</p>


        <div className="flex space-x-4">

        <button className="btn btn-xs sm:btn-sm md:btn-md px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300" onClick={openModal}>
  Edit Profile
</button>


  <button className="btn px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300" onClick={() => document.getElementById('my_modal_1').showModal()}>
    Change Profile Photo
  </button>

</div>




<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Select Photo</h3>
    
    <div className="modal-action">
      <form method="dialog">
        <div className="flex flex-col justify-center items-center pt-10">
          <div className="w-full max-w-lg mx-auto bg-blue shadow-md rounded p-4 mt-4">
            <div className="flex items-center justify-center">
              {uploadedImageURL && (
                <img
                  src={uploadedImageURL}
                  alt="Selected Profile Photo"
                  className="w-40 h-40 rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={onSubmit}
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none"
              >
                Update Profile Photo
              </button>
            </div>
          </div>
        </div>
      </form>
      
    </div>
    <p className="py-4">Press ESC key  to close</p>
  </div>
</dialog>





        <dialog ref={modalRef} className={`modal ${isModalOpen ? 'open' : ''}`}>
          <div className="modal-box bg-info-content rounded shadow-md p-4">
            <div className="w-full max-w-md mx-auto p-4">
          <form onSubmit={handleSubmit} className="bg-info-content shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black">
  <div className="mb-4">
    <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
      Name
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
      id="name"
      type="text"
      placeholder={userInfo?.name}
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div className="mb-4">
    <label className="block text-white text-sm font-bold mb-2" htmlFor="age">
      Age
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
      id="age"
      type="text"
      placeholder={userInfo?.age}
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />
  </div>

  <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="newLocation">
          New Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          id="newLocation"
          type="text"
          placeholder="Enter a new location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>


  <div className="mb-4">
    <label className="block text-white text-sm font-bold mb-2" htmlFor="bio">
      Bio
    </label>
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
      id="bio"
      type="text"
      placeholder={userInfo?.bio}
      value={bio}
      onChange={(e) => setBio(e.target.value)}
    />
  </div>

  <div className="mb-6">
    {isLoading ? (
      <Loader />
    ) : (
      <button
        className="w-full bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Update Profile
      </button>
    )}
  </div>
</form>
</div>
              <p className="py-4">Press ESC key  to close</p>
            </div>
            <form method="dialog" className="modal-backdrop"></form>
          </dialog>
          
        </div>
      </div>
    </div>

    
  );
}

export default ProfileCard;
