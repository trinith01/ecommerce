import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './categorydetail.css';

const CategoryDetail = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${name}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Update suggestions based on the search query
    const filteredSuggestions = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} style={{ fontWeight: 'bold', color: '#333' }}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-detail">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchQuery && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((product) => (
              <Link
                to={`/categories/${product.category}/products/${product.id}`}
                key={product.id}
                className="suggestion-item"
                onClick={() => setSearchQuery('')} // Clear input on suggestion click
              >
                {highlightText(product.name, searchQuery)}
              </Link>
            ))}
          </div>
        )}

        {/* If search query is present but no suggestions */}
        {searchQuery && suggestions.length === 0 && (
          <div className="no-results">No matching products found.</div>
        )}
      </div>

      {/* Product list */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/categories/${product.category}/products/${product.id}`} key={product.id} className="product-card">
              <img src={`http://localhost:5000${product.image}`} alt={product.name} />
              <h3 style={{ color: 'Black' }}>{product.name}</h3>
              <p style={{ color: 'white' }}>${product.old_price}</p>
              <p style={{ color: 'white' }}>${product.new_price}</p>
            </Link>
          ))
        ) : (
          // If no products available
          <div className="no-items">No items available in this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
