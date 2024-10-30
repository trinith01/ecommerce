import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderItems = async () => {
            const token = localStorage.getItem('token'); // Retrieving token

            try {
                const response = await axios.get('http://localhost:5000/api/order', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                setOrderItems(response.data);
                setLoading(false);
            } catch (error) {
                setError('Please log in to view your order items.');
                setLoading(false);
            }
        };

        fetchOrderItems();
    }, []);

    if (loading) return <div className="loading text-center text-xl">Loading order items...</div>;
    if (error) return <div className="error text-red-600 text-center">{error}</div>;

    return (
        <div className="bg-[#00143c] min-h-screen flex items-center justify-center p-6"> {/* Full-screen background */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"> {/* Card styling */}
                <h2 className="text-2xl font-semibold mb-4 text-center">Your Order</h2>
                {orderItems.length === 0 ? (
                    <p className="text-gray-600 text-center">Your order is empty.</p>
                ) : (
                    <ul className="space-y-4">
                        {orderItems.map((order) => (
                            <li key={order.order_id} className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <h3 className="text-lg font-bold text-blue-600">Order ID: {order.order_id}</h3>
                                <p className="text-gray-800">Email: <span className="font-medium">{order.contact_email}</span></p>
                                <p className="text-gray-800">Phone: <span className="font-medium">{order.contact_phone}</span></p>
                                <hr className="my-2 border-gray-300" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
