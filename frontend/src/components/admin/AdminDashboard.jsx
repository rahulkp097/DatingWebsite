import React, { useEffect, useState } from "react";
import CardTwo from "./CardTwo";
import Graph from "./Graph";
import { useGetDashboardDataMutation } from "../../slices/adminApiSlice";

function AdminDashboard() {
  const [dashboardDataApi] = useGetDashboardDataMutation();
  const [totalUsers, setTotalUsers] = useState();
  const [totalPlanCount, setTotalPlanCount] = useState();
  const [usersPerMonth, setUsersPermonth] = useState([]);

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
    const res = await dashboardDataApi().unwrap();
    setTotalUsers(res.totalUsers);
    setTotalPlanCount(res.planCounts);
    setUsersPermonth(res.usersPerMonth);
  };

  const chartData = Array.from(
    { length: 12 },
    (_, i) => usersPerMonth.find((item) => item._id === i + 1)?.count || 0
  );
  const labels = Array.from({ length: 12 }, (_, i) =>
    convertToMonthName(i + 1)
  );

  return (
    <>
      <CardTwo totalUsers={totalUsers} planCounts={totalPlanCount} />
      <div className="h-[700px] ">
        <Graph chartData={chartData} labels={labels} />
      </div>
    </>
  );
}

export default AdminDashboard;
