// ProfileFilter.jsx

import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import HobbiesData from "../../Data/Hobbies.json";
import OccupassionData from "../../Data/Occupassion.json";
import QualificationData from "../../Data/Qualification.json";

const ProfileFilter = ({ profiles, onFilter }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");

  // Assuming you have a list of unique genders in your profiles
  const genders = [...new Set(profiles.map((profile) => profile.gender))];

  // Assuming OccupassionData is an array of occupation options
  const occupationOptions = OccupassionData.map((occupation, index) => (
    <option key={index} value={occupation}>
      {occupation}
    </option>
  ));

  // Assuming QualificationData is an array of qualification options
  const qualificationOptions = QualificationData.map((qualification, index) => (
    <option key={index} value={qualification}>
      {qualification}
    </option>
  ));

  useEffect(() => {
    filterProfiles();
  }, [selectedGender, selectedOccupation, selectedQualification]);

  const filterProfiles = () => {
    // Implement your filtering logic here
    let filteredData = profiles;

    if (selectedGender) {
      filteredData = filteredData.filter(
        (profile) => profile.gender === selectedGender
      );
    }

    if (selectedOccupation) {
      filteredData = filteredData.filter(
        (profile) => profile.occupation === selectedOccupation
      );
    }

    if (selectedQualification) {
      filteredData = filteredData.filter(
        (profile) => profile.qualification === selectedQualification
      );
    }

    onFilter(filteredData);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Gender Dropdown */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Occupation Dropdown */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="occupation"
          >
            Occupation
          </label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            value={selectedOccupation}
            onChange={(e) => setSelectedOccupation(e.target.value)}
          >
            <option value="">Select Occupation</option>
            {occupationOptions}
          </select>
        </div>

        {/* Qualification Dropdown */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="qualification"
          >
            Qualification
          </label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            value={selectedQualification}
            onChange={(e) => setSelectedQualification(e.target.value)}
          >
            <option value="">Select Qualification</option>
            {qualificationOptions}
          </select>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-600 focus:outline-none"
        onClick={filterProfiles}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProfileFilter;
