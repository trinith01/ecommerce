// Cart.js
import React from 'react';
import { useCart } from './cartcontext'; // Ensure this path is correct

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Get cart items and the remove function

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.new_price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
