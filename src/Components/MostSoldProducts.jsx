import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MostSoldProducts = () => {
    const [products, setProducts] = useState([]);
    const [startDate, setStartDate] = useState('2024-01-01'); // Default start date
    const [endDate, setEndDate] = useState('2024-12-31'); // Default end date
    const [inputStartDate, setInputStartDate] = useState('2024-01-01'); // Controlled input for start date
    const [inputEndDate, setInputEndDate] = useState('2024-12-31'); // Controlled input for end date

    // Function to fetch most sold products based on the date range
    const fetchMostSoldProducts = (start, end) => {
        fetch(`http://localhost:5000/api/most-sold-products?start=${start}&end=${end}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    };

    // Fetch most sold products for the initial date range
    useEffect(() => {
        fetchMostSoldProducts(startDate, endDate);
    }, [startDate, endDate]);

    // Handle form submission for date inputs
    const handleSubmit = (e) => {
        e.preventDefault();
        setStartDate(inputStartDate); // Update start date
        setEndDate(inputEndDate); // Update end date
    };

    // Prepare data for the chart
    const chartData = {
        labels: products.map(product => product.product_name), // Product names as labels
        datasets: [
            {
                label: 'Total Quantity Sold',
                data: products.map(product => product.total_quantity_sold), // Quantity sold
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
                    color: 'white', // Set legend label color to white
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
        <div className="p-6 bg-transparent mt-10">
            <h2 className="text-3xl text-center text-white mb-6">Most Sold Products</h2>

            {/* Input Form for Date Range */}
            <form onSubmit={handleSubmit} className="flex flex-row max-w-[900px] bg-transparent shadow-none w-full justify-between items-center mb-6">
                <div>
                    <label className="text-lg text-white mr-4">Start Date :</label>
                    <input
                        type="date"
                        value={inputStartDate}
                        onChange={(e) => setInputStartDate(e.target.value)}
                        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                    />
                </div>
                <div>
                    <label className="text-lg text-white mr-4">End Date :</label>
                    <input
                        type="date"
                        value={inputEndDate}
                        onChange={(e) => setInputEndDate(e.target.value)}
                        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                    />
                </div>
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition duration-200"
                >
                    Fetch Report
                </button>
            </form>

            {/* Chart for Most Sold Products */}
            <div className="mt-8">
                {products.length > 0 ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    <div className="mt-4 text-center bg-white text-black rounded-xl p-6 w-[1000px] mx-auto">No data available for the selected criteria.</div>
                )}
            </div>

            {/* Most Sold Products Table */}
            {/* <div className="overflow-x-auto items-center justify-center flex mt-8">
                <table className="items-center justify-center min-w-[900px] bg-white rounded-xl">
                    <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left rounded-tl-xl">Product</th>
                            <th className="px-4 py-2 text-left rounded-tr-xl">Total Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-100 transition duration-200"
                                >
                                    <td className="px-4 py-2 rounded-xl">{product.product_name}</td>
                                    <td className="px-4 py-2 rounded-xl">{product.total_quantity_sold}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="2"
                                    className="px-4 py-2 text-center text-gray-600"
                                >
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default MostSoldProducts;