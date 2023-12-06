import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const monthNames = [
  null,
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const RevenueGraph = ({ revenueData }) => {
  const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

 
  const novemberData = revenueData?.reduce((acc, item) => {
    acc[item.month] = item.revenue;
    return acc;
  }, {});

  
  const filledData = allMonths.map((month) => ({
    month,
    revenue: novemberData[month] || 0,
  }));

  const data = {
    labels: filledData.map((item) => monthNames[item.month]), 
    datasets: [
      {
        label: "Revenue",
        data: filledData.map((item) => item.revenue),
        borderColor: "rgba(255, 99, 132, 1)", // Change the color as needed
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: "rgba(255, 99, 132, 1)", // Change the color as needed
      },
    ],
  };

  const options = {

    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        min: 0,
        max: Math.max(...revenueData?.map((item) => item.revenue)) + 1000,
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "black", 
        anchor: "end",
        align: "end",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueGraph;
