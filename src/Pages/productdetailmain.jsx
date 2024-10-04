import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Toaster, Position, Intent, Button } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
// import './productdetailmain.css'

const toaster = Toaster.create({
  position: Position.TOP,
});

const ProductDetailMain = () => {
    const { name } = useParams();
    const { id } = useParams(); // Get the product ID from the URL parameters
    const [product, setProduct] = useState(null); // State to store product details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [quantity, setQuantity] = useState(1); // State for product quantity
    const [selectedColor, setSelectedColor] = useState('gold'); // State for selected color

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/categories/${name}/products/${id}`); // Fetch product by ID
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, name]); // Add name to the dependency array

    const changeQuantity = (value) => {
        setQuantity((prev) => Math.max(1, prev + value)); // Ensure quantity doesn't go below 1
    };
    const email = localStorage.getItem('email');
    const addToCart = async () => {
        try {
            await axios.post('http://localhost:5000/api/cartpost', {
                productId: product.id,
                color: selectedColor,
                quantity,                                                                                                                                                                  
                email
            });
            // alert('Product added to cart!');
            toaster.show({
              intent: Intent.SUCCESS,
              message: "Product added to cart!",
              timeout:3000
              });
        } catch (error) {
            console.error('Error adding to cart:', error);
            // alert('Failed to add product to cart');
            toaster.show({
              intent: Intent.DANGER,
              message: "Failed to add product to cart",
              timeout:3000
              });
        }
    };

    if (loading) return <div className="loading">Loading product...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-detail">
            {product ? (
                <>
                    <h2 style={{ color: 'white' }}>{product.name}</h2>
                    <img src={`http://localhost:5000${product.image}`} alt={product.name} />
                    <p style={{ color: 'white', textDecoration: 'line-through' }}>${product.old_price}</p>
                    <p style={{ color: 'white' }}>${product.new_price}</p>
                    <p style={{ color: 'white' }}>{product.description}</p> {/* Assuming there's a description field */}

                    <div>
                        <label style={{ color: 'white' }}>Choose Color: </label>
                        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                            <option value="black">Black</option>
                        </select>
                    </div>

                    <div style={{ margin: '10px 0' }}>
                        <label style={{ color: 'white' }}>Quantity: </label>
                        <button style={{color:"white"}} onClick={() => changeQuantity(-1)}>-</button>
                        <input type="number" value={quantity} readOnly style={{ width: '50px', textAlign: 'center' }} />
                        <button style={{color:"white"}} onClick={() => changeQuantity(1)}>+</button>
                    </div>

                    <button
                        type='button'
                        onClick={addToCart}
                        style={{ borderRadius: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer' }}
                    >
                        Add To Cart
                    </button>
                </>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
};

export default ProductDetailMain;
