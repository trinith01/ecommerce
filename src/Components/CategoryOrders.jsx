import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const CategoryOrders = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch the main category and total orders data
  const fetchCategoryOrdersData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/category-orders');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      // Transform the data for Chart.js format
      const categoryNames = data.map(item => item.main_category_name);
      const totalOrders = data.map(item => item.total_orders);

      setChartData({
        labels: categoryNames,
        datasets: [
          {
            label: 'Total Orders',
            data: totalOrders,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryOrdersData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: 'white', // Set legend text color to white
            },
        },
    },
    scales: {
      x: {
          ticks: {
              color: 'white', // Set x-axis label color to white
          },
          grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Optional: change x-axis grid color
          },
      },
      y: {
          ticks: {
              color: 'white', // Set y-axis label color to white
          },
          grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Optional: change y-axis grid color
          },
      },
  },
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl mt-4 mb-6 text-center text-white">Main Category Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-3xl mx-auto text-white">
          <Bar
            data={chartData}
            options={chartOptions}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryOrders;