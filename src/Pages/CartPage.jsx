import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:5000/api/items', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Fixed syntax error
                    },
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                setError('Please log in as a guest or sign in as a user to view your cart items.');
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const removeCartItem = async (id) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`, { // Fixed syntax error
                headers: {
                    'Authorization': `Bearer ${token}` // Fixed syntax error
                },
            });

            setCartItems(cartItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setError('Error removing item from cart');
        }
    };

    // Function to delete all cart items
    const deleteAllCartItems = async () => {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail'); // Assuming you store the user's email in localStorage

        try {
            await axios.delete('http://localhost:5000/api/items', { // Fixed syntax error
                headers: {
                    'Authorization': `Bearer ${token}`, // Fixed syntax error
                    'Email': userEmail // Pass user email in the header or as query parameter if needed
                },
            });
            setCartItems([]); // Clear cart items from state
        } catch (error) {
            console.error('Error deleting all cart items:', error);
            setError('Error deleting all cart items');
        }
    };

    const handleProceedToCheckout = async () => {
        await deleteAllCartItems(); // Delete all items from the cart
        const userEmail = localStorage.getItem('userEmail'); // Get user email
        const userPhone = localStorage.getItem('userPhone'); // Get user phone (make sure this is stored in localStorage)
        const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0); // Assuming items have a price property

        navigate('/payment', { state: { amount: cartTotal, email: userEmail, phone: userPhone } });
    };

    if (loading) return <div className="loading">Loading cart items...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="bg-[#00143c] min-h-screen p-6 flex flex-col items-center"> {/* Set full-page background color */}
            <h2 className="text-3xl font-bold text-white mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-white">Your cart is empty.</p>
            ) : (
                <ul className="w-full max-w-lg bg-white rounded-lg shadow-md p-4">
                    {cartItems.map((item) => (
                        <li key={item.id} className="border-b border-gray-300 py-2">
                            <h3 className="text-lg font-semibold">Product ID: {item.product_id}</h3>
                            <p>Color: {item.color}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => removeCartItem(item.id)} className="remove-button bg-red-500 text-white px-3 py-1 rounded">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <button onClick={handleProceedToCheckout} className="checkout-button bg-green-500 text-white px-4 py-2 rounded mt-4">
                    Proceed to Checkout
                </button>
            )}
        </div>
    );
};

export default CartPage;
