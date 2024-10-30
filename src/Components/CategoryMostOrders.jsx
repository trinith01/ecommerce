import React, { useState, useEffect } from 'react';

const CategoryMostOrders = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/category-most-orders')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 bg-transparent mt-10">
            <h2 className="text-3xl text-center text-white mb-6 mt-4">Category with Most Orders</h2>

            {/* Display Categories */}
            <div className="flex flex-col items-center justify-center">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <div key={index} className="mt-8 text-center bg-white text-black rounded-xl p-6 w-[900px] mx-auto flex items-center justify-center gap-[400px]">
                            <h3 className="text-2xl font-semibold">{category.category_name}</h3>
                            <h3 className="text-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl">Total Orders: {category.total_orders}</h3>
                            {/* If you also want to show quantity sold, uncomment below */}
                            {/* <p className="text-gray-600">Total Quantity Sold: {category.total_quantity_sold}</p> */}
                        </div>
                    ))
                ) : (
                    <div className="mt-4 text-center bg-white text-black rounded-xl p-6 w-[1000px] mx-auto">No data available for the selected criteria.</div>
                )}
            </div>
        </div>
    );
};

export default CategoryMostOrders;