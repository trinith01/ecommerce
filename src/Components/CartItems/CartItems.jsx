import React, { useEffect, useState } from 'react';
import './CartItems.css';
import remove_icon from '../Assets/minusicon.png';
import { Link } from 'react-router-dom';
import all_product from '../Assets/all_product';

const CartItems = () => {
  const [cartItems, setCartItems] = useState({
    1: { q: 2, size: ['M', 'L'], color: ['red', 'blue'] },
    2: { q: 1, size: ['L'], color: ['green'] },
    3: { q: 0, size: [], color: [] },
    4: { q: 1, size: ['S'], color: ['blue'] },
    5: { q: 3, size: ['XL', 'M'], color: ['red', 'green'] },
  });

  const removeFromCartById = (id, index) => {
    setCartItems((prevCart) => {
      const updatedItem = { ...prevCart[id] };
      updatedItem.size.splice(index, 1);
      updatedItem.color.splice(index, 1);

      if (updatedItem.size.length === 0) {
        updatedItem.q = 0;
      }

      return { ...prevCart, [id]: updatedItem };
    });
  };

  const cartHasMultipleItems = Object.values(cartItems).filter(item => item.q > 0).length >= 2;

  const [isLargeViewport, setIsLargeViewport] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeViewport(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='cartpg'>
      <div className='cartitems'>
        <h2>Your Cart</h2>
        {isLargeViewport ? (
          <>
            <div className="cartitems-header">
              <p>Products</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
              if (cartItems[e.id]?.q > 0) {
                return (
                  <div key={e.id}>
                    <div className="cartitems-row">
                      <img src={e.image} alt='' className='carticon-product-icon' />
                      <p>{e.name}</p>
                      <p>Rs.{e.new_price}</p>
                      <button className='cartitems-quantity'>{cartItems[e.id].q}</button>
                      <p>Rs.{e.new_price * cartItems[e.id].q}</p>
                      <div className="cartitems-remove-capsules">
                        <ul className="cartitems-size-list">
                          {cartItems[e.id]?.size.map((sizeItem, index) => (
                            <li key={index} className="cartitems-size-item">
                              <div className="cartitems-size-color">
                                <span>{sizeItem}</span>
                                <span>-</span>
                                <span>{cartItems[e.id]?.color[index]}</span>
                                <img
                                  className="cartitems-remove-icon-small"
                                  src={remove_icon}
                                  onClick={() => removeFromCartById(e.id, index)}
                                  alt=''
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link style={{ textDecoration: 'none' }} to='/order'>
                        <button className='cartitems-checkout-btn'>PROCEED TO CHECKOUT</button>
                      </Link>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </>
        ) : (
          <>
            {all_product.map((e) => {
              if (cartItems[e.id]?.q > 0) {
                return (
                  <div key={e.id}>
                    <div className='main-div'>
                      <div className="cartitems-row-left">
                        <img src={e.image} alt='' className='carticon-product-icon' />
                      </div>
                      <div className="cartitems-row-right">
                        <p className='product-name'>{e.name}</p>
                        <div className='cartitems-row-right-details'>
                          <div className="cartitems-row-right-details-left">
                            <p>Rs.{e.new_price * cartItems[e.id].q}</p>
                            <label>Quantity
                              <span class="cartitems-quantity">{cartItems[e.id].q}</span>
                            </label>
                          </div>
                          <div className="cartitems-remove-capsules">
                            <ul className="cartitems-size-list">
                              {cartItems[e.id]?.size.map((sizeItem, index) => (
                                <li key={index} className="cartitems-size-item">
                                  <div className="cartitems-size-color">
                                    <img className='cartitems-remove-icon-small' src={remove_icon} onClick={() => removeFromCartById(e.id, index)} alt='' />
                                    <span>{sizeItem}</span>
                                    <span>-</span>
                                    <span>{cartItems[e.id]?.color[index]}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Link style={{ textDecoration: 'none' }} to='/order'>
                          <button className='cartitems-checkout-btn'>PROCEED TO CHECKOUT</button>
                        </Link>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </>
        )}

        {cartHasMultipleItems && <h4>*You have to checkout each item separately!</h4>}
      </div>
    </div>
  );
}

export default CartItems;
