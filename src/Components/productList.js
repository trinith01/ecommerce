import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [limit] = useState(10);  // Number of products to load per request
  const [offset, setOffset] = useState(0);  // Current offset for pagination
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);  // To show/hide products

  // Fetch products from the backend with pagination
  const fetchProducts = async (newOffset) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/products?limit=${limit}&offset=${newOffset}`);
      setProducts((prevProducts) => [...prevProducts, ...response.data]);  // Append new products
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts(0);  // Load first 10 products initially
  }, []);

  // Handler for "Explore More" button
  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchProducts(newOffset);
  };

  // Handler for "Show Less" button
  const handleShowLess = () => {
    setProducts([]);  // Reset products list
    setOffset(0);     // Reset offset
    fetchProducts(0); // Load initial products again
    setShowAll(false);
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>

      {/* "Explore More" Button */}
      {!showAll && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Explore More'}
        </button>
      )}

      {/* "Show Less" Button */}
      {products.length > limit && !loading && (
        <button onClick={handleShowLess}>
          Show Less
        </button>
      )}
    </div>
  );
};

export default ProductList;
