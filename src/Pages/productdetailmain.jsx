import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, Position, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './productdetailmain.css';

const toaster = Toaster.create({
  position: Position.TOP,
});

const ProductDetailMain = () => {
  const navigate = useNavigate();
  const { name, id } = useParams(); // Get product name and ID from URL
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [quantity, setQuantity] = useState(1); // State for product quantity
  const [selectedColor, setSelectedColor] = useState('gold'); // State for selected color
  const [isGuest, setIsGuest] = useState(false); // Guest state
  const [guestEmail, setGuestEmail] = useState(''); // Guest email input
  const [guestName, setGuestName] = useState(''); // Guest name input

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${name}/products/${id}`); // Fetch product by ID
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, name]); // Add name to the dependency array

  const changeQuantity = (value) => {
    setQuantity((prev) => Math.max(1, prev + value)); // Ensure quantity doesn't go below 1
  };

  const addToCart = async () => {
    const email = localStorage.getItem('email');
    
    try {
      if (!email) {
        setIsGuest(true); // If no email is found, show guest input form
        return;
      }

      // Adding product to the cart for logged-in user
      await axios.post('http://localhost:5000/api/cartpost', {
        productId: product.id,
        color: selectedColor,
        quantity,
        email,
      });
      toaster.show({
        intent: Intent.SUCCESS,
        message: "Product added to cart!",
        timeout: 3000,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toaster.show({
        intent: Intent.DANGER,
        message: "Failed to add product to cart",
        timeout: 3000,
      });
    }
  };

  const handleGuestCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/guest-cart', {
        name: guestName,
        email: guestEmail,
        productId: product.id,
        color: selectedColor,
        quantity,
      });

      if (response.status === 200) {
        const data = response.data; // Correctly access the data
        // Save the token and email to local storage if provided
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        localStorage.setItem('email', guestEmail); // Save guest email

        toaster.show({
          intent: Intent.SUCCESS,
          message: "Product added to cart for guest!",
          timeout: 3000,
        });

        // Optionally navigate to another page after successful checkout
        // navigate('/payment');
      } else {
        toaster.show({
          intent: Intent.DANGER,
          message: "Failed to add product to cart for guest",
          timeout: 3000,
        });
      }
    } catch (error) {
      console.error('Error during guest checkout:', error);
      toaster.show({
        intent: Intent.DANGER,
        message: "Error during guest checkout",
        timeout: 3000,
      });
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-detail-container">
      {product ? (
        <div className="product-detail">
          <div className="product-image">
            <img src={`http://localhost:5000${product.image}`} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="old-price">${product.old_price}</p>
            <p className="new-price">${product.new_price}</p>
            <p>{product.description}</p>

            <div className="color-selection">
              <label>Choose Color: </label>
              <select className="select" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                <option style={{color:'white'}}value="gold">Gold</option>
                <option  style={{color:'white'}} value="silver">Silver</option>
                <option style={{color:'white'}}  value="black">Black</option>
              </select>
            </div>

            <div className="quantity-selection">
              <label>Quantity: </label>
              <button onClick={() => changeQuantity(-1)}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => changeQuantity(1)}>+</button>
            </div>

            <div className="action-buttons">
              <button type="button" onClick={addToCart}>Add To Cart</button>
              {isGuest && (
                <div className="guest-checkout">
                  <h3>Guest Checkout</h3>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)} // Allow typing in input
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)} // Allow typing in input
                  />
                  <button onClick={handleGuestCheckout}>Continue as Guest</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetailMain;
