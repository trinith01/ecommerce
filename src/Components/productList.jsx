// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul style={styles.productList}>
        {products.map((product) => (
          <li key={product.id} style={styles.productCard}>
            <Link to={`/products/${product.id}`} style={styles.link}>
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <p>{product.description}</p>
              <p>
                Price: ${product.new_price} <del>${product.old_price}</del>
              </p>
              <p>Available colors: {JSON.parse(product.colors).join(', ')}</p>
              <p>In Stock: {product.available ? "Yes" : "No"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Basic styles
const styles = {
  productList: {
    listStyleType: 'none',
    padding: 0,
  },
  productCard: {
    margin: '20px',
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  productImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  },
};

export default ProductList;
