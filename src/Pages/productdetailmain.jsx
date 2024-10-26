import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, Position, Intent, Dialog } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
// import './productdetailmain.css'; // Keep any custom styles here

const toaster = Toaster.create({
  position: Position.TOP,
});

const ProductDetailMain = () => {
  const navigate = useNavigate();
  const { name, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('gold');
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${name}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, name]);

  const changeQuantity = (value) => {
    setQuantity((prev) => Math.max(1, prev + value));
  };

  const addToCart = async () => {
    const email = localStorage.getItem('email');
    
    try {
      if (!email) {
        setIsGuestModalOpen(true);
        return;
      }

      await axios.post('http://localhost:5000/api/cartpost', {
        productId: product.id,
        color: selectedColor,
        quantity,
        email,
      });
      toaster.show({
        intent: Intent.SUCCESS,
        message: "Product added to cart!",
        timeout: 3000,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toaster.show({
        intent: Intent.DANGER,
        message: "Failed to add product to cart",
        timeout: 3000,
      });
    }
  };

  const handleGuestCheckout = async () => {
    if (!guestName || !guestEmail) {
      toaster.show({
        intent: Intent.DANGER,
        message: "Please fill in your name and email!",
        timeout: 3000,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/guest-cart', {
        name: guestName,
        email: guestEmail,
        productId: product.id,
        color: selectedColor,
        quantity,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        localStorage.setItem('email', guestEmail);

        toaster.show({
          intent: Intent.SUCCESS,
          message: "Product added to cart for guest!",
          timeout: 3000,
        });

        setIsGuestModalOpen(false);
      } else {
        toaster.show({
          intent: Intent.DANGER,
          message: "Failed to add product to cart for guest",
          timeout: 3000,
        });
      }
    } catch (error) {
      console.error('Error during guest checkout:', error);
      toaster.show({
        intent: Intent.DANGER,
        message: "Error during guest checkout",
        timeout: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#00143c' }}>
    <div className="max-w-4xl mx-auto p-4" style={{ backgroundColor: '#0087d1' }} >
      {loading && <div className="text-center text-xl">Loading product...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {product && (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6" style={{ backgroundColor: '#0087d1' }}>
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img className="w-full h-auto rounded-lg" src={`http://localhost:5000${product.image}`} alt={product.name} />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-lg line-through text-gray-500">${product.old_price}</p>
            <p className="text-2xl text-green-600">${product.new_price}</p>
            <p className="mt-2">{product.description}</p>

            <div className="mt-4">
              <label className="block text-sm font-medium">Choose Color:</label>
              <select
                className="mt-1 block w-full p-2 bg-black text-white rounded"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="black">Black</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Quantity:</label>
              <div className="flex items-center mt-1">
                <button
                  className="bg-gray-300 hover:bg-gray-400 rounded px-2"
                  onClick={() => changeQuantity(-1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="mx-2 text-center border border-gray-300 rounded w-12"
                  value={quantity}
                  readOnly
                />
                <button
                  className="bg-gray-300 hover:bg-gray-400 rounded px-2"
                  onClick={() => changeQuantity(1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                type="button"
                onClick={addToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        title="Guest Checkout"
      >
        <div className="bp3-dialog-body">
          <input
            type="text"
            placeholder="Enter your name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="bp3-input mb-2"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="bp3-input mb-2"
            required
          />
        </div>
        <div className="bp3-dialog-footer">
          <button className="bp3-button" onClick={handleGuestCheckout}>Continue as Guest</button>
          <button className="bp3-button bp3-intent-danger" onClick={() => setIsGuestModalOpen(false)}>Cancel</button>
        </div>
      </Dialog>
    </div>
    </div>
  );
};

export default ProductDetailMain;
