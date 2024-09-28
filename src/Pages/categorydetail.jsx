import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

// eslint-disable-next-line
const CategoryDetail = () => {
  const { name } = useParams(); // Get the category name from the URL parameters
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products by category name
        const response = await axios.get(`http://localhost:5000/api/categories/${name}/products`);
        setProducts(response.data); // Set products data
        console.log(response.data); // Log response data for debugging
        setLoading(false); // Set loading to false
      } catch (error) {
        setError('Error fetching products'); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchProducts();
  }, [name]); // Add name to the dependency array

  if (loading) return <div className="loading">Loading products...</div>; // Loading state
  if (error) return <div className="error">{error}</div>; // Error state

  return (
    <div className="product-detail">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>${product.new_price}</p> {/* Assuming new_price is the current price */}
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <p>No products found in this category.</p> // No products message
      )}
    </div>
  );
};

export default CategoryDetail;
