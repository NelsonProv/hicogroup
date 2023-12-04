import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const StatsModal = ({ employees, onClose }) => {

      // Function to calculate employee stats
  const calculateStats = (employees) => {
    const maleCount = employees.filter((employee) => employee.Gender === 'Male').length;
    const femaleCount = employees.filter((employee) => employee.Gender === 'Female').length;
    const greenCount = countColorOccurrences(employees, 'Green');
    const blueCount = countColorOccurrences(employees, 'Blue');
    const redCount = countColorOccurrences(employees, 'Red');
    const defaultCount = countColorOccurrences(employees, 'Default');

    return [maleCount, femaleCount, greenCount, blueCount, redCount, defaultCount];
  };

  // Function to count occurrences of a specific color in employee profiles
  const countColorOccurrences = (employees, color) => {
    return employees.reduce((count, employee) => {
      return count + (employee.ProfileColors.includes(color) ? 1 : 0);
    }, 0);
  };
  const chartRef = useRef(null);

  useEffect(() => {
    // Create or update the chart
    if (chartRef.current) {
      // Destroy the previous chart instance
      chartRef.current.destroy();
    }

    // Create a new chart instance
    chartRef.current = new Chart(document.getElementById('myChart'), {
      type: 'bar',
      data: {
        labels: ['Males', 'Females', 'Green', 'Blue', 'Red', 'Default'],
        datasets: [
          {
            label: 'Employee Stats',
            data: calculateStats(employees),
            backgroundColor: [
              'rgba(0, 0, 0, 0.5)',
              'rgba(455, 99, 332, 0.5)',
              'rgba(0, 128, 0, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(128, 128, 128, 0.5)',
            ],
            

            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false, // Disable aspect ratio to allow chart size customization
        responsive: true, // Make the chart responsive
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Cleanup: destroy the chart when the component is unmounted
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [employees]); 



  return (
    <div className="stats-modal">
        
      <canvas id="myChart" width="200" height="300"></canvas>
    </div>
  );
};

export default StatsModal;
