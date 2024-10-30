import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderItems = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from local storage

            if (!token) {
                setError('Please log in to view your order items.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/order', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                // Extract order items from the first element of the response array
                const orders = response.data[0] || [];
                setOrderItems(orders);
            } catch (error) {
                console.error('Error fetching order items:', error);
                setError(
                    error.response?.status === 401
                        ? 'Session expired. Please log in again.'
                        : 'Unable to fetch order items. Please try again later.'
                );
            } finally {
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
                <h2 className="text-2xl font-semibold mb-4 text-center">Your Orders</h2>
                {orderItems.length === 0 ? (
                    <p className="text-gray-600 text-center">You have no orders.</p>
                ) : (
                    <ul className="space-y-4">
                        {orderItems.map((order) => (
                            <li
                                key={order.order_id}
                                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-lg font-bold text-blue-600">Order ID: {order.order_id}</h3>
                                <p className="text-gray-800">
                                    Email: <span className="font-medium">{order.contact_email}</span>
                                </p>
                                <p className="text-gray-800">
                                    Phone: <span className="font-medium">{order.contact_phone}</span>
                                </p>
                                <p className="text-gray-800">
                                    Delivery Method: <span className="font-medium">{order.delivery_method}</span>
                                </p>
                                <p className="text-gray-800">
                                    Order Date: <span className="font-medium">{new Date(order.order_date).toLocaleDateString()}</span>
                                </p>
                                <p className="text-gray-800">
                                    Delivery Estimate: <span className="font-medium">{new Date(order.delivery_estimate).toLocaleDateString()}</span>
                                </p>
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
