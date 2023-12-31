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
import OccupassionData from "../../Data/Occupassion.json";
import QualificationData from "../../Data/Qualification.json";

import { useUpdateProfileMutation } from "../../slices/userApiSlice";
import Loader from "./Loader";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function RegistrationDetails() {
  const [image, setImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [uploadImageApi, { isLoading }] = useUpdateUserProfilePhotoMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [cloudinaryApi] = useUploadPhotoToCloudinaryMutation();
  const dispatch = useDispatch();
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentLocation, setCurrentLocation] = useState();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial values when the component mounts
    setName(userInfo?.name || "");
    setGender(userInfo?.gender || "");
  }, [userInfo]);

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

  const [profileUpdate] = useUpdateProfileMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredHobbies = HobbiesData.filter((hobby) =>
    hobby.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        currentLocation,
      }).unwrap();

      if (res.success) {
        dispatch(setCredentials(res.user));
        navigate("/");
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

  const getCurrentLocation = async () => {
    const mapboxToken =
      "pk.eyJ1IjoibmFmaTc4OSIsImEiOiJjbG81ZTJ5M2cwN3RpMmtuenQ2ZHRkdWkyIn0.uLkKyNbf5FxAYBoAGi3eRg";

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&country=IN`
      );
      const data = await response.json();
      const features = data.features || [];

      // Extract relevant details from the features
      const suggestions = features.map((feature) => feature.place_name);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching address suggestions", error);
    }
  };
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    getCurrentLocation();
  };
  const handleSelectLocation = (location) => {
    setQuery(location);
    setCurrentLocation(location);
    setSuggestions([])
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
    <>
      <Header />

      <div className="bg-slate-800  min-h-screen flex items-center justify-center  p-6">
        <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col items-center">
            <div className="about-avatar mb-4 flex flex-col items-center">
              <img
                src={
                  userInfo?.image ||
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                }
                alt="Avatar"
                title="Avatar"
                className="rounded-full mx-auto md:mx-0 h-64 w-64 object-cover"
              />
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="btn btn-info text-black px-4 py-2 rounded mt-2"
              >
                Upload Profile Photo
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

          <form
            onSubmit={handleSubmit}
            className="bg-slate-400 shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
                <div className="flex flex-col">
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search hobbies"
                    className="border-b mb-2 px-2 py-1 focus:outline-none focus:border-indigo-600"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* Hobbies List */}
                  <div className="h-40 border rounded bg-gray-100 p-2 overflow-y-auto">
                    {filteredHobbies.map((option, index) => (
                      <div key={index} className="mb-2">
                        <input
                          className="checkbox checkbox-success mr-2"
                          type="checkbox"
                          id={option}
                          value={option}
                          checked={selectedHobbies.includes(option)}
                          onChange={handleHobbyChange}
                        />
                        <label htmlFor={option} className="ml-2">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
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
                  htmlFor="currentLocation"
                >
                  Current Location
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                  id="currentLocation"
                  type="text"
                  placeholder="Enter current location"
                  value={query}
                  onChange={handleInputChange}
                />
                <ul className="mt-2">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-blue-500 hover:underline  text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                      onClick={() => handleSelectLocation(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
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
                <>
                  <button
                    className="w-full bg-black hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update Profile
                  </button>

                  <Link to="/">
                    <button
                      className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Update Later
                    </button>
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RegistrationDetails;
