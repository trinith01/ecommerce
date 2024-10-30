import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  if (loading) return <div className="text-center text-gray-700">Loading categories...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div style={{ backgroundColor: '#00143c' }} className="bg-blue-500 min-h-screen py-10 mt-16"> {/* Set red background */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">Product Categories</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {categories.length === 0 ? (
          <p className="text-center text-white">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
  <Link
    to={`/categories/${category.name}/products`} // Link to the products page of the category
    key={category.id}
    className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 mb-4" // Added mb-4 for bottom margin
  >
    <div className="p-6">
      <h3 className="text-lg font-semibold text-center text-gray-800">{category.name}</h3>
    </div>
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-1 w-full"> <br /></div>
  </Link>
  
))}

          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
