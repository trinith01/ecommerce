import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, Position, Intent, Dialog } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './productdetailmain.css';

const toaster = Toaster.create({
  position: Position.TOP,
});

const ProductDetailMain = () => {
  const navigate = useNavigate();
  const { name, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('gold');
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${name}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, name]);

  const changeQuantity = (value) => {
    setQuantity((prev) => Math.max(1, prev + value));
  };

  const addToCart = async () => {
    const email = localStorage.getItem('email');
    
    try {
      if (!email) {
        setIsGuestModalOpen(true);
        return;
      }

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
    if (!guestName || !guestEmail) {
      toaster.show({
        intent: Intent.DANGER,
        message: "Please fill in your name and email!",
        timeout: 3000,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/guest-cart', {
        name: guestName,
        email: guestEmail,
        productId: product.id,
        color: selectedColor,
        quantity,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        localStorage.setItem('email', guestEmail);

        toaster.show({
          intent: Intent.SUCCESS,
          message: "Product added to cart for guest!",
          timeout: 3000,
        });

        setIsGuestModalOpen(false);
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

  return (
    <div className="product-detail-container">
      {loading && <div className="loading">Loading product...</div>}
      {error && <div className="error">{error}</div>}

      {product && (
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
              <select style={{ backgroundColor: "black", color: "white" }} value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="black">Black</option>
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
            </div>
          </div>
        </div>
      )}

      <Dialog
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        title="Guest Checkout"
      >
        <div className="bp3-dialog-body">
          <input
            type="text"
            placeholder="Enter your name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            required
          />
        </div>
        <div className="bp3-dialog-footer">
          <button className="bp3-button" onClick={handleGuestCheckout}>Continue as Guest</button>
          <button className="bp3-button bp3-intent-danger" onClick={() => setIsGuestModalOpen(false)}>Cancel</button>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDetailMain;
