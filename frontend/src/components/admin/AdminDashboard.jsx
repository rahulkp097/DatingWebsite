import React, { useEffect, useState } from "react";
import CardTwo from "./CardTwo";
import Graph from "./Graph";
import { useGetDashboardDataMutation } from "../../slices/adminApiSlice";


function AdminDashboard() {

  const [dashboardDataApi]=useGetDashboardDataMutation()
const [totalUsers,setTotalUsers]=useState()
const [totalPlanCount,setTotalPlanCount]=useState()
const [usersPerMonth,setUsersPermonth]=useState()
  useEffect(()=>{
    getDashboardData()
  },[])
  const chartData = [112, 10, 225, 134, 101, 80, 50, 100, 200];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  const convertToMonthName = (monthNumber) => {
    const months = [
      null,
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    return months[monthNumber];
  };
  
  const newData = usersPerMonth?.map(item => {
    return {
      month: convertToMonthName(item._id),
      count: item.count
    };
  });

  const getDashboardData=async()=>{

    const res=await dashboardDataApi().unwrap()
    setTotalUsers(res.totalUsers)
    setTotalPlanCount(res.planCounts)
    setUsersPermonth(res.usersPerMonth)
  }
  console.log("permonth",newData)
  return (
    <>
    <CardTwo totalUsers={totalUsers}planCounts={totalPlanCount} />
    <Graph chartData={newData?.map(entry => entry.count)} labels={newData} />
    </>
  );
}

export default AdminDashboard;
