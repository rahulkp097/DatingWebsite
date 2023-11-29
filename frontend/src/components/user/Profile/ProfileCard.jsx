import React, { useState } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { ProfileTabs } from "./ProfileTabs";
import { useUpdateUserProfilePhotoMutation, useUploadPhotoToCloudinaryMutation } from "../../../slices/userApiSlice";
import { setCredentials } from "../../../slices/authSlice";
import Loader from "../Loader";

function ProfileCard() {
  const [image, setImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [uploadImageApi, { isLoading }] = useUpdateUserProfilePhotoMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [cloudinaryApi,{isLoading:isLoadingCloudinery}] = useUploadPhotoToCloudinaryMutation();
  const dispatch = useDispatch();



  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setUploadedImageURL(URL.createObjectURL(selectedImage));
  };



  const onSubmit = async () => {
    if (!image) {
      toast.error("Please select an image to update your profile photo.");
      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "datingWebsite");
    data.append("cloud_name", "dzwiqrzng");

    try {
      const response = await cloudinaryApi(data).unwrap();

      if (response.url) {
        const imageUrl = response.url;
        const userId = userInfo._id;
        const res = await uploadImageApi({ imageUrl, userId }).unwrap();

        if (res.success) {
          dispatch(setCredentials(res.user));
          toast.success("Profile photo updated successfully");
        }
      } else {
        toast.error("Failed to update profile photo");
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
      toast.error("An error occurred while updating the profile photo");
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gray-700` p-5" id="about">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <div
                className="about-avatar"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="indicator" >
  {userInfo?.subscription?.planName && (
  <span className={`indicator-item badge ${userInfo?.subscription?.planName === 'Premium Plan' ? 'badge-secondary' : 'badge-primary'} hidden sm:inline`}>
      {userInfo?.subscription?.planName}
    </span>)}
                <img
                  src={
                    userInfo?.image ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  alt="Avatar"
                  title="Avatar"
                  className="rounded-full mx-auto md:mx-0 h-80"
                />
  </div>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="btn btn-info text-black px-4 py-2 rounded mt-2"
                >
                {isLoading || isLoadingCloudinery? <Loader/>: "Change Image"}
                  
                </button>
              </div>
            </div>

            <dialog id="my_modal_1" className="modal ">
              <div className="modal-box bg-zinc-300">
                <h3 className="font-bold text-lg">Select Photo</h3>

                <div className="modal-action">
                  <form method="dialog">
                    <div className="flex flex-col justify-center items-center pt-10 ">
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
                <p className="py-4">Press ESC key to close</p>
              </div>
            </dialog>

            <div className="md:w-1/2">
              <div className="about-text">
                <h3 className="text-accent-content text-2xl font-bold">
                  {userInfo?.name}
                </h3>

                <p className="text-info-content ">{userInfo?.bio}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="media">
                    <label className="text-info  text-xl">Occupation</label>
                    <p>{userInfo?.occupation}</p>
                  </div>

                  <div className="media">
                    <label className="text-info text-xl">Age</label>
                    <p>{userInfo?.age} </p>
                  </div>
                  <div className="media">
                    <label className="text-info text-xl">Gender</label>
                    <p>{userInfo?.gender}</p>
                  </div>
                  <div className="media">
                    <label className="text-info text-xl">Home Location</label>
                    <p>{userInfo?.city}</p>
                  </div>
                  
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="media">
                    <label className="text-info text-xl ">Qualification</label>
                    <p>{userInfo?.education}</p>
                  </div>
                  <div className="media">
                    <label className="text-info text-xl">Hobbies</label>
                    <p>{userInfo?.hobbies && userInfo?.hobbies.join(", ")}</p>
                  </div>
                  <div className="media">
                    <label className="text-info text-xl">Current Location</label>
                    <p>{userInfo?.currentLocation}</p>
                  </div>

                  <div className="media">
                    <label className="text-info text-xl ">E-mail</label>
                    <p>{userInfo?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="counter mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"></div>
          </div>
        </div>
      </section>

      

      <div>
        <ProfileTabs/>
      </div>


    </div>
  );
}

export default ProfileCard;
