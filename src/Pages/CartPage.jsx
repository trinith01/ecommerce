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
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching cart items');
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleProceedToCheckout = () => {
        navigate('/payment'); // Navigate to payment page
    };

    if (loading) return <div className="loading">Loading cart items...</div>;
    if (error) return <div className="error">{error}</div>;

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
