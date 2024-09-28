import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './categorypage.css'; // Your CSS for styling

const CategoryPage = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for handling API issues

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/categories'); // API to get categories
      setCategories(response.data.categories); // Assuming your API returns a list of categories
      setLoading(false);
    } catch (error) {
      setError('Error fetching categories'); // Set error message if fetching fails
      setLoading(false);
    }
  };

  // UseEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div className="loading">Loading categories...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-page">
      <header className="category-header">
        <h1>Product Categories</h1> {/* Heading for categories */}
      </header>

      <main className="category-list">
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={`/categories/${category.name}/products`} // Link to the products page of the category
                key={category.id}
                className="category-card"
              >
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
