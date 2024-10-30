import React, { useState, useEffect } from 'react';

const CustomerOrderReport = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/customer-order-report')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 bg-gray-100 rounded-xl shadow-md mt-10 max-w-[1000px] mx-auto">
            <h2 className="text-3xl text-center text-gray-800 mb-6">Customer Order Report</h2>

            {/* Scrollable Table Container */}
            <div className="overflow-x-auto max-h-[500px]"> {/* Set a maximum height for scrolling */}
                <table className="min-w-full bg-white shadow-md rounded-xl">
                    <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider rounded-tl-xl">Customer ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">Order Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">Total Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider rounded-tr-xl">Items Purchased</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index} className="bg-white hover:bg-gray-100 transition duration-200 rounded-xl">
                                    <td className="px-6 py-4 border-t border-gray-300">{order.customer_id}</td>
                                    <td className="px-6 py-4 border-t border-gray-300">{order.order_id}</td>
                                    <td className="px-6 py-4 border-t border-gray-300">{order.order_date}</td>
                                    <td className="px-6 py-4 border-t border-gray-300">{order.total_amount_spent}</td>
                                    <td className="px-6 py-4 border-t border-gray-300">{order.items_purchased}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center bg-white text-black rounded-xl">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerOrderReport;