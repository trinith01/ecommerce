import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; // Importing CSS file for styling

const Home = () => {
  const [products, setProducts] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for handling API issues

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products'); // Fetch all products
      setProducts(response.data.products); // Store fetched products in state
      setLoading(false);
    } catch (error) {
      setError('Error fetching products'); // Set error message if fetching fails
      setLoading(false);
    }
  };

  // UseEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <header className="header">
        <h1>Welcome to Our Store</h1>
        <p style={{color: 'white'}}>Your one-stop shop for everything colorful!</p>
      </header>

      <main className="main-content">
        <section className="hero">
          <h2>Discover the Latest Trends</h2>
          <Link to="/categories" className="shop-now-button">Shop Now</Link> {/* Navigation to category page */}
        </section>

        <section className="featured-products">
          <h2>Featured Products</h2>
          {products.length === 0 ? (
            <p>No products available at the moment.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <Link to={`../categories/${product.category}/products/${product.id}`} key={product.id} className="product-card"> {/* Navigation to product detail page */}
                  <img src='/OIP.jpg' alt={product.name} />
                  <h3 style={{color: 'Black'}}>{product.name}</h3>
                  <p style={{color: 'white'}}>${product.old_price}</p>
                  <p style={{color: 'white'}}>${product.new_price}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p style={{color:"white"}}>&copy; 2024 Our Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
