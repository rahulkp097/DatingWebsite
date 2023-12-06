import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const CardTwo = ({ totalUsers, planCounts }) => {
  // Define a mapping of plan names to colors
  const planColorMap = {
    "Basic Plan": "bg-orange-600",
    "Premium Plan": "bg-pink-600",
    // Add more plan names and colors as needed
  };

  return (
    <div className="m-6">
      <div className="flex flex-wrap -mx-6">
        {/* Total Users Card */}
        <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100">
            <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
            <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... SVG Paths */}
            <FontAwesomeIcon icon={faUsers} />
              </svg>
            </div>
            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {totalUsers}
              </h4>
              <div className="text-gray-500">Total Users</div>
            </div>
          </div>
        </div>

        {/* Render Plan Counts dynamically */}
        {planCounts?.map((planCount, index) => {
          const [planName, count] = Object.entries(planCount)[0]; // Extract planName and count
          const planColorClass = planColorMap[planName] || "bg-gray-600"; // Default to gray if no color is defined

          return (
            <div
              key={index}
              className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0 "
            >
              <div
                className={`flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100`}
              >
                <div className={`p-3 rounded-full ${planColorClass}`}>
                  {/* You can customize the SVG or use plain text as needed */}
                  <svg
                    className="h-8 w-8 text-white"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* ... SVG Paths */}
                  </svg>
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {count}
                  </h4>
                  <div className="text-gray-500">{planName}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardTwo;
