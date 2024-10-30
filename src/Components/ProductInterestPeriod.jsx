import React, { useState } from 'react';

const ProductInterestPeriod = () => {
    const [productId, setProductId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [periodData, setPeriodData] = useState(null); // Change to null for single values

    const fetchPeriodData = () => {
        if (productId && startDate && endDate) {
            fetch(`http://localhost:5000/api/product-interest-period?product_id=${productId}&start=${startDate}&end=${endDate}`)
                .then(res => res.json())
                .then(data => {
                    // Access the first inner array and then the object within it
                    if (data.length > 0 && data[0].length > 0) {
                        setPeriodData(data[0][0]); // Set periodData to the first object
                    } else {
                        setPeriodData(null); // Reset if no data is found
                    }
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="p-6 bg-transparent mt-10">
            <h2 className="text-3xl text-center text-white mb-10">Time Period with Most Interest</h2>

            <div className="mb-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                    type="text"
                    placeholder="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 font-bold"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 font-bold"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 font-bold"
                />
                <button
                    onClick={fetchPeriodData}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl transition duration-200"
                >
                    Get Interest Data
                </button>
            </div>

            {periodData ? ( // Check if periodData is not null
                <div className="mt-8 text-center bg-white text-black rounded-xl p-6 w-[900px] mx-auto flex items-center justify-center gap-[400px]">
                    <h3 className="text-2xl font-semibold">Period: {periodData.period}</h3>
                    <h3 className="text-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl">Total Quantity Sold: {periodData.total_quantity_sold}</h3>
                </div>
            ) : (
                <div className="mt-4 text-center bg-white text-black rounded-xl p-6 w-[1000px] mx-auto">No data available for the selected criteria.</div>
            )}
        </div>
    );
};

export default ProductInterestPeriod;