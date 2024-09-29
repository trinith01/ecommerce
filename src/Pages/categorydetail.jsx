import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
          <Link to={`/categories/${product.category}/products/${product.id}`} key={product.id} className="product-card"> {/* Navigation to product detail page */}
          <img src='/OIP.jpg' alt={product.name} />
          <h3 style={{color: 'Black'}}>{product.name}</h3>
          <p style={{color: 'Black'}}>${product.old_price}</p>
          <p style={{color: 'Black'}}>${product.new_price}</p>
        </Link>
        ))
      ) : (
        <p>No products found in this category.</p> // No products message
      )}
    </div>
  );
};

export default CategoryDetail;
