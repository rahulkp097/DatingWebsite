import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useUpdateUserPasswordMutation,
  useUpdateUserProfilePhotoMutation,
  useUploadPhotoToCloudinaryMutation,
} from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { Country, State, City } from "country-state-city";
import HobbiesData from "../../Data/Hobbies.json";
import InterestsData from "../../Data/Interests.json";
import OccupassionData from "../../Data/Occupassion.json";
import QualificationData from "../../Data/Qualification.json";

import { useUpdateProfileMutation } from "../../slices/userApiSlice";
import Loader from "./Loader";

function ProfileCard() {
  const [image, setImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [uploadImageApi, { isLoading }] = useUpdateUserProfilePhotoMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [cloudinaryApi] = useUploadPhotoToCloudinaryMutation();
  const dispatch = useDispatch();
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setUploadedImageURL(URL.createObjectURL(selectedImage));
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedQualification, setQualification] = useState(
    userInfo?.selectedQualification || ""
  );
  const [selectedOccupation, setOccupation] = useState(
    userInfo?.selectedOccupation || ""
  );
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const handleHobbyChange = (e) => {
    const hobby = e.target.value;
    if (e.target.checked) {
      // Add the selected hobby to the array
      setSelectedHobbies([...selectedHobbies, hobby]);
    } else {
      // Remove the unselected hobby from the array
      setSelectedHobbies(selectedHobbies.filter((item) => item !== hobby));
    }
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  const [gender, setGender] = useState(userInfo?.gender || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileUpdate] = useUpdateProfileMutation();
  const [updatePasswordApi] = useUpdateUserPasswordMutation();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const userId = userInfo._id;
      const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if (currentPassword !== confirmPassword) {
        toast.error("Passwords do not match");
      }  else if (newPassword.length < 6) {
        toast.error("Password should be at least six letters");
      } else if (!specialCharacters.test(newPassword)) {
        toast.error("Password should contain at least one special character");
      }

    else{

     const res = await updatePasswordApi({
        userId,
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      if (res.success) {
        toast.success("Password updated successfully");
        dispatch(setCredentials(res.user));
      } else {
        toast.error(res.message);
      }
    }
    } catch (error) {
      toast.error("Error updating password:", error);
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await profileUpdate({
        name,
        age,
        gender,
        bio,
        selectedHobbies,
        selectedOccupation,
        selectedQualification,
        userInfo,
        selectedCountry,
        selectedState,
        selectedCity,
      }).unwrap();

      if (res.success) {
        dispatch(setCredentials(res.user));
        toast.success("Profile updated successfully");
        setName("");
        setAge("");
        setBio("");

        setOccupation("");
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
                <img
                  src={
                    userInfo?.image ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  alt="Avatar"
                  title="Avatar"
                  className="rounded-full mx-auto md:mx-0 h-80"
                />
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="btn btn-info text-black px-4 py-2 rounded mt-2"
                >
                  Change Image
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
                    <label className="text-info text-xl">location</label>
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

      <div className="collapse w-1/2 bg-slate-400 m-6">
        <input type="checkbox" />
        <div className="collapse-title justify-center text-xl font-medium">
          <h1 className=" font-semibold  text-center ">Edit profile</h1>
        </div>

        <div className="collapse-content">
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-info-content shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="name"
                  >
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
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="age"
                  >
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
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="occupation"
                  >
                    Occupation
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                    id="occupation"
                    value={selectedOccupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  >
                    <option value="">Select occupation</option>
                    {OccupassionData.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="occupation"
                  >
                    Qualificaction
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                    id="qualification"
                    value={selectedQualification}
                    onChange={(e) => setQualification(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    {QualificationData.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="hobbies"
                  >
                    Hobbies
                  </label>
                  <div className="h-40 border   rounded bg-gray-100 p-2 overflow-y-auto">
                    {HobbiesData.map((option, index) => (
                      <div key={index} className="mb-2">
                        <input
                          className="checkbox checkbox-success mr-2"
                          type="checkbox"
                          id={option}
                          value={option}
                          checked={selectedHobbies.includes(option)}
                          onChange={handleHobbyChange}
                        />
                        <label htmlFor={option} className="ml-2 ">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                    id="country"
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      // Fetch states of the selected country
                      const selectedCountryId = e.target.value;
                      const statesOfCountry =
                        State.getStatesOfCountry(selectedCountryId);
                      setStates(statesOfCountry);
                      // Reset state and city selections
                      setSelectedState("");
                      setSelectedCity("");
                    }}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                    id="state"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      // Fetch cities of the selected state
                      const selectedStateId = e.target.value;
                      const selectedCountryId = selectedCountry; // Get the selected country's ID or code
                      const citiesOfState = City.getCitiesOfState(
                        selectedCountryId,
                        selectedStateId
                      );
                      setCities(citiesOfState);
                      // Reset city selection
                      setSelectedCity("");
                    }}
                  >
                    <option value="">Select a state</option>
                    {states.map((state, index) => (
                      <option key={index} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="bio"
                  >
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
              </div>

              <div className="mb-6">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    className="w-full bg-black  hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="collapse w-1/2 m-6  bg-slate-400">
        <input type="checkbox" />
        <div className="collapse-title justify-center text-xl font-medium">
          <h1 className="font-semibold  text-center ">Update Password</h1>
        </div>
        <div className="collapse-content">
          <div>
            {/* Password update section */}
            <form
              onSubmit={handlePasswordUpdate}
              className="bg-info-content shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black"
            >
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    className=" bg-black  hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update Password
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
