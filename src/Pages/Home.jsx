import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; // Importing CSS file for styling

const Home = () => {
  const [products, setProducts] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for handling API issues
  const [visibleProductsCount, setVisibleProductsCount] = useState(6); // Number of products to show initially

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

  const handleShowMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 6); // Show 6 more products
  };

  const handleShowLess = () => {
    setVisibleProductsCount((prevCount) => Math.max(prevCount - 6, 6)); // Show 6 fewer products, but not less than 6
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <header className="header">
        <h1>Welcome to Our Store</h1>
        <p >Your one-stop shop for everything colorful!</p>
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
              {products.slice(0, visibleProductsCount).map((product) => (
                <Link to={`../categories/${product.category}/products/${product.id}`} key={product.id} className="product-card"> {/* Navigation to product detail page */}
                  <img src={`http://localhost:5000${product.image}`} alt={product.name} />
                  <h3 style={{color: 'Black'}}>{product.name}</h3>
                  <p className='old'>${product.old_price}</p>
                  <p >${product.new_price}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Show More / Show Less button */}
          <div className="button-container">
            {visibleProductsCount < products.length && (
              <button onClick={handleShowMore} className="show-more" >
                Show More
              </button>
            )}
            {visibleProductsCount >= products.length && visibleProductsCount > 6 && (
              <button onClick={handleShowLess} className="show-less" >
                Show Less
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p >&copy; 2024 Our Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
