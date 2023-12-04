import { useEffect, useRef, useCallback } from 'react';
import { Chart } from 'chart.js/auto';

const StatsModal = ({ employees, onClose }) => {
  const calculateStats = useCallback((employees) => {
    const maleCount = employees.filter((employee) => employee.Gender === 'Male').length;
    const femaleCount = employees.filter((employee) => employee.Gender === 'Female').length;
    const greenCount = countColorOccurrences(employees, 'Green');
    const blueCount = countColorOccurrences(employees, 'Blue');
    const redCount = countColorOccurrences(employees, 'Red');
    const defaultCount = countColorOccurrences(employees, 'Default');

    return [maleCount, femaleCount, greenCount, blueCount, redCount, defaultCount];
  }, []);

  const countColorOccurrences = (employees, color) => {
    return employees.reduce((count, employee) => {
      return count + (employee.ProfileColors.includes(color) ? 1 : 0);
    }, 0);
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

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
        maintainAspectRatio: false,
        responsive: true,
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
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [employees, calculateStats]);

  return (
    <div className="stats-modal">
      <canvas id="myChart" width="200" height="300"></canvas>
    </div>
  );
};

export default StatsModal;
