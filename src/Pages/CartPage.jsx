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
                        'Authorization': `Bearer ${token}`
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
            await axios.delete(`http://localhost:5000/api/items/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
            await axios.delete(`http://localhost:5000/api/items`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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
