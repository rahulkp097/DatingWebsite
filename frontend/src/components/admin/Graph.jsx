import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

const Graph = ({ chartData, labels }) => {
    const data = {
      labels: labels?.map(entry => entry.month),
      datasets: [
        {
          label: 'Number of Users',
          data: chartData,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  
    const options = {
      scales: {
        x: {
          type: 'category',
        },
        y: {
          type: 'linear',
          min: 0,
        },
      },
    };
  
    return <Bar data={data} options={options} />
  };
  
  export default Graph;