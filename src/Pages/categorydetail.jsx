import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './categorydetail.css'; // Keep this for custom styles if needed

const CategoryDetail = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(6);

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
            <span key={index} className="font-bold text-blue-600">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleShowMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 6);
  };

  const handleShowLess = () => {
    setVisibleProductsCount(6);
  };

  if (loading) return <div className="text-center text-xl">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div   style={{ backgroundColor: '#00143c' }}className="category-detail p-6 bg-gray-100 min-h-screen">
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        {searchQuery && suggestions.length > 0 && (
          <div className="suggestions-dropdown bg-white border border-gray-300 rounded shadow-md">
            {suggestions.map((product) => (
              <Link
                to={`/categories/${product.category}/products/${product.id}`}
                key={product.id}
                className="block p-2 hover:bg-blue-500 hover:text-white"
                onClick={() => setSearchQuery('')}
              >
                {highlightText(product.name, searchQuery)}
              </Link>
            ))}
          </div>
        )}
        {searchQuery && suggestions.length === 0 && (
          <div className="no-results text-gray-600">No matching products found.</div>
        )}
      </div>

      <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.slice(0, visibleProductsCount).map((product) => (
            <Link to={`/categories/${product.category}/products/${product.id}`} key={product.id} className="product-card bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
              <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-2 text-lg font-semibold text-black">{product.name}</h3>
              <p className="text-gray-500 line-through">${product.old_price}</p>
              <p className="text-green-600 font-bold">${product.new_price}</p>
            </Link>
          ))
        ) : (
          <div className="no-items text-center text-gray-600">No items available in this category.</div>
        )}
      </div>

      <div className="button-container mt-4">
        {visibleProductsCount < products.length && (
          <button onClick={handleShowMore} className="show-more bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Show More
          </button>
        )}
        {visibleProductsCount >= products.length && (
          <button onClick={handleShowLess} className="show-less bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
