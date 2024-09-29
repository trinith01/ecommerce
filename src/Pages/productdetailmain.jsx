import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import './productdetailmain.css'

const ProductDetailMain = () => {
    const { name } = useParams();
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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
  }, [id]); // Add id to the dependency array

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-detail">
      {product ? (
        <>
          <h2>{product.name}</h2>
          <img src='/OIP.jpg' alt={product.name} />
          <p style={{ color: 'white', textDecoration: 'line-through' }}>${product.old_price}</p>
          <p style={{color: 'white'}}>${product.new_price}</p>
          <p style={{color: 'white'}}>{product.description}</p> {/* Assuming there's a description field */}
          <button type='button' style={{ borderRadius: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer' }}>
  Add To Cart
</button>

        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetailMain;
