import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css'; 

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        </div>
    );
};

export default CartPage;
