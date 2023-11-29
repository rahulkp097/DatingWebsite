import React, { useEffect, useState } from "react";
import CardTwo from "./CardTwo";
import Graph from "./Graph";
import { useGetDashboardDataMutation } from "../../slices/adminApiSlice";
import RevenueGraph from "./RevenueGraph";

function AdminDashboard() {
  const [dashboardDataApi] = useGetDashboardDataMutation();
  const [totalUsers, setTotalUsers] = useState();
  const [totalPlanCount, setTotalPlanCount] = useState();
  const [usersPerMonth, setUsersPerMonth] = useState([]);
  const [usersPerWeek, setUsersPerWeek] = useState([]);
  const [usersPerYear, setUsersPerYear] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("monthly");
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]); // Initialize with null


  const convertToMonthName = (monthNumber) => {
    const months = [
      null,
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months[monthNumber];
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  
  const getDashboardData = async () => {
    try {
      const res = await dashboardDataApi().unwrap();
      setMonthlyRevenueData(res.monthlyRevenueData);
      setTotalUsers(res.totalUsers);
      setTotalPlanCount(res.planCounts);
      setUsersPerMonth(res.usersPerMonth);
      setUsersPerWeek(res.usersPerWeek);
      setUsersPerYear(res.usersPerYear);
    } catch (error) {
      console.error(error);
    }
  };
  

  const convertToWeekLabel = (weekLabel) => {
    if (!weekLabel) {
      return "Unknown Week";
    }
  
    const [year, week] = weekLabel.split('-');
    const weekNumber = parseInt(week, 10);
  
    // Calculate the start and end dates of the week
    const startDate = new Date(year, 0, 1);
    const daysToFirstThursday = (11 - startDate.getDay() + 7) % 7;
    startDate.setDate(1 + daysToFirstThursday + (weekNumber - 2) * 7);
  
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
  
    // Format the dates as strings
    const startDateString = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const endDateString = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
    return `Week ${weekNumber} (${startDateString} - ${endDateString}, ${year})`;
  };
  

  const chartData =
    selectedInterval === "monthly"
      ? Array.from({ length: 12 }, (_, i) => usersPerMonth.find((item) => item._id === i + 1)?.count || 0)
      : selectedInterval === "weekly"
      ? usersPerWeek.map((item) => item.count)
      : selectedInterval === "yearly"
      ? usersPerYear.map((item) => item.count)
      : [];
  const labels =
    selectedInterval === "monthly"
      ? Array.from({ length: 12 }, (_, i) => convertToMonthName(i + 1))
      : selectedInterval === "weekly"
      ? usersPerWeek.map((item) => convertToWeekLabel(item._id))
      : selectedInterval === "yearly"
      ? usersPerYear.map((item) => item._id)
      : [];

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <>
      <CardTwo totalUsers={totalUsers} planCounts={totalPlanCount} />

   
      
      <div className="h-[700px] ">
  <div>
  <h1 className="text-3xl font-semibold m-6 text-center sm:text-center"> Users Data </h1>
    
       <div className="flex justify-center items-center mt-4">
        <label className="mr-2">Select Interval:</label>
        <select
          value={selectedInterval}
          onChange={(e) => handleIntervalChange(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

    <Graph chartData={chartData} labels={labels} />
  </div>

  <div>
   <h1 className="text-3xl font-semibold m-6 text-center sm:text-center">
                Revenue Data
              </h1>
    <RevenueGraph revenueData={monthlyRevenueData} />
  </div>
</div>

    </>
  );
}

export default AdminDashboard;
