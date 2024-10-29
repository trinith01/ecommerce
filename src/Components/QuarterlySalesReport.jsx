import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuarterlySalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    const [year, setYear] = useState('2021'); // Default year
    const [inputYear, setInputYear] = useState('2021'); // Controlled input state

    // Function to fetch sales data
    const fetchSalesData = (year) => {
        fetch(`http://localhost:5000/api/quarterly-sales?year=${year}`)
            .then(res => res.json())
            .then(data => setSalesData(data))
            .catch(err => console.error(err));
    };

    // Fetch sales data for the initial year
    useEffect(() => {
        fetchSalesData(year);
    }, [year]);

    // Handle form submission for year input
    const handleSubmit = (e) => {
        e.preventDefault();
        setYear(inputYear); // Trigger data fetch for the entered year
    };

    // Prepare data for the chart
    const chartData = {
        labels: salesData.map(row => `Q${row.quarter}`),
        datasets: [
            {
                label: `Sales in ${year}`,
                data: salesData.map(row => row.total_sales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

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
                    color: 'white', // Set x-axis labels color to white
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Optional: Set x-axis grid line color
                },
            },
            y: {
                ticks: {
                    color: 'white', // Set y-axis labels color to white
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Optional: Set y-axis grid line color
                },
            },
        },
    };

    return (
        <div className="p-6 bg-transparent rounded-xl">
            <h2 className="text-3xl text-center text-white mb-6">Quarterly Sales Report</h2>
            
            {/* Input Form for Year */}
            <form onSubmit={handleSubmit} className="flex flex-row max-w-[700px] bg-transparent shadow-none w-full justify-between items-center mb-6">
                <div>
                    <label className="text-xl text-white mr-4">Enter Year :</label>
                    <input
                        type="number"
                        value={inputYear}
                        onChange={(e) => setInputYear(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none font-bold focus:ring focus:ring-blue-500"
                        placeholder="Enter year"
                    />
                </div>
                <button type="submit" className="ml-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition duration-200">
                    Fetch Report
                </button>
            </form>

            {/* Bar Chart */}
            <div className="mb-8">
                {salesData.length > 0 ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    <div className="mt-4 text-center bg-white text-black rounded-xl p-6 w-[1000px] mx-auto">No data available for the selected criteria.</div>
                )}
            </div>

            {/* Table */}
            {/* <div className="overflow-x-auto items-center justify-center flex">
                <table className="items-center justify-center min-w-[900px] bg-white rounded-xl">
                    <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl">
                        <tr>
                            <th className="px-4 py-2 rounded-tl-xl">Quarter</th>
                            <th className="px-4 py-2 rounded-tr-xl">Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.length > 0 ? (
                            salesData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition duration-200">
                                    <td className="px-4 py-2 rounded-xl">{`Q${row.quarter}`}</td>
                                    <td className="px-4 py-2 rounded-xl">{row.total_sales}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-2 text-center text-gray-600">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default QuarterlySalesReport;
