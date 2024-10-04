import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Toaster, Position, Intent, Button } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '@blueprintjs/core/lib/css/blueprint.css';
import './productdetailmain.css'; // Make sure to create this CSS file

const toaster = Toaster.create({
  position: Position.TOP,
});

const ProductDetailMain = () => {
    const navigate=useNavigate();
  const { name } = useParams();
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [quantity, setQuantity] = useState(1); // State for product quantity
  const [selectedColor, setSelectedColor] = useState(''); // State for selected color

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

  const email = localStorage.getItem('email');
  const addToCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cartpost', {
        productId: product.id,
        color: selectedColor,
        quantity,
        email
      });
      toaster.show({
        intent: Intent.SUCCESS,
        message: "Product added to cart!",
        timeout: 3000
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toaster.show({
        intent: Intent.DANGER,
        message: "Failed to add product to cart",
        timeout: 3000
      });
    }
  };
const buyNow=()=>{
    navigate("/payment");
}


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
              <select  className="select" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                <option  style={{ color:"white"}} value="gold">Gold</option>
                <option style={{ color:"white"}}  value="silver">Silver</option>
                <option style={{ color:"white"}}  value="black">Black</option>
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
              <button type="button" onClick={buyNow}>Buy Now</button>
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
