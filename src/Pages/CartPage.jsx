import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CartPage.css'; 

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage

            try {
                // Make a GET request with the authorization header
                const response = await axios.get('http://localhost:5000/api/items', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token
                    },
                });
                setCartItems(response.data); // Set the cart items from the response
                setLoading(false);
            } catch (error) {
                setError('Error fetching cart items'); // Handle errors
                setLoading(false);
            }
        };

        fetchCartItems(); // Call the function to fetch cart items
    }, []); // Empty dependency array to run once on component mount

    // Function to handle removing an item from the cart
    const removeCartItem = async (id) => {
        const token = localStorage.getItem('token'); // Retrieve token

        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in the header
                },
            });

            // Remove the item from the cartItems state after successful deletion
            setCartItems(cartItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setError('Error removing item from cart');
        }
    };

    const handleProceedToCheckout = () => {
        navigate('/payment'); // Navigate to payment page
    };

    if (loading) return <div className="loading">Loading cart items...</div>; // Show loading state
    if (error) return <div className="error">{error}</div>; // Show error state

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <h3>Product ID: {item.product_id}</h3>
                            <p>Color: {item.color}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => removeCartItem(item.id)} className="remove-button">
                                Remove
                            </button>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <button onClick={handleProceedToCheckout} className="checkout-button">
                    Proceed to Checkout
                </button>
            )}
        </div>
    );
};

export default CartPage;
