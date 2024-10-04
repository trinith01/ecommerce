import React, { useEffect, useState } from 'react';
import './CartItems.css';
import removeIcon from '../Assets/minusicon.png';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const CartItems = () => {
  const [cartItems, setCartItems] = useState({
    1: { q: 2, size: ['M', 'L'], color: ['red', 'blue'] },
    2: { q: 1, size: ['L'], color: ['green'] },
    3: { q: 0, size: [], color: [] },
    4: { q: 1, size: ['S'], color: ['blue'] },
    5: { q: 3, size: ['XL', 'M'], color: ['red', 'green'] },
  });

  const [products, setProducts] = useState([]);
  const [isLargeViewport, setIsLargeViewport] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeViewport(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePayment = (event) => {
    event.preventDefault(); // Prevent default form submission if inside a form
    navigate('/payment'); // Use navigate to redirect
    // Add your payment submission logic here
  };

  const removeFromCartById = (id, index) => {
    setCartItems(prevCart => {
      const updatedItem = { ...prevCart[id] };
      updatedItem.size.splice(index, 1);
      updatedItem.color.splice(index, 1);

      if (updatedItem.size.length === 0) {
        updatedItem.q = 0; // Remove item if no sizes left
      }

      return { ...prevCart, [id]: updatedItem };
    });
  };

  const cartHasItems = Object.values(cartItems).some(item => item.q > 0);
  const cartHasMultipleItems = Object.values(cartItems).filter(item => item.q > 0).length >= 2;

  return (
    <div className='cartpg'>
      <div className='cartitems'>
        <h2>Your Cart</h2>
        <CartHeader isLargeViewport={isLargeViewport} />

        {products.map((product) => (
          cartItems[product.id]?.q > 0 && (
            <CartItem 
              key={product.id} 
              product={product} 
              quantity={cartItems[product.id].q} 
              sizes={cartItems[product.id].size} 
              colors={cartItems[product.id].color} 
              removeFromCart={removeFromCartById} 
              isLargeViewport={isLargeViewport}
            />
          )
        ))}

        {/* Show the checkout warning if multiple items */}
        {cartHasMultipleItems && <h4>*You have to checkout each item carefully!</h4>}
        
        {/* Proceed to Checkout button */}
        {cartHasItems && (
          <div className="checkout-btn-container">
            
              <button className='cartitems-checkout-btn' onClick={handlePayment}>PROCEED TO CHECKOUT</button>
            
          </div>
        )}
      </div>
    </div>
  );
};

const CartHeader = ({ isLargeViewport }) => (
  <div className="cartitems-header">
    <p>Products</p>
    {isLargeViewport && (
      <>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </>
    )}
    <hr />
  </div>
);

const CartItem = ({ product, quantity, sizes, colors, removeFromCart, isLargeViewport }) => (
  <div className='cartitems-row'>
    <img src={product.image || '/OIP.jpg'} alt='product' className='carticon-product-icon' />
    {isLargeViewport ? (
      <>
        <p>{product.name}</p>
        <p>Rs.{product.new_price}</p>
        <button className='cartitems-quantity'>{quantity}</button>
        <p>Rs.{product.new_price * quantity}</p>
        <RemoveSizes sizes={sizes} colors={colors} removeFromCart={removeFromCart} productId={product.id} />
      </>
    ) : (
      <div className='main-div'>
        <div className="cartitems-row-right">
          <p className='product-name'>{product.name}</p>
          <div className='cartitems-row-right-details'>
            <p>Rs.{product.new_price * quantity}</p>
            <label>Quantity <span className="cartitems-quantity">{quantity}</span></label>
          </div>
          <RemoveSizes sizes={sizes} colors={colors} removeFromCart={removeFromCart} productId={product.id} />
        </div>
      </div>
    )}
  </div>
);

const RemoveSizes = ({ sizes, colors, removeFromCart, productId }) => (
  <div className="cartitems-remove-capsules">
    <ul className="cartitems-size-list">
      {sizes.map((size, index) => (
        <li key={index} className="cartitems-size-item">
          <div className="cartitems-size-color">
            <span>{size}</span>
            <span>-</span>
            <span>{colors[index]}</span>
            <img
              src={removeIcon}
              alt='remove'
              className='removeIcon'
              onClick={() => removeFromCart(productId, index)}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CartItems;
