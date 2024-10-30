import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Toaster, Position, Intent, Dialog } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';

const toaster = Toaster.create({
  position: Position.TOP,
});

const ProductDetailMain = () => {
  const { name, id } = useParams();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stockInfo, setStockInfo] = useState([]);
  const [selectedSku, setSelectedSku] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState(null); // Track the variant_id
  const [quantity, setQuantity] = useState(1);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${name}/products/${id}`);
        const { product, variants, categories, stockInfo } = response.data;

        setProduct(product || {});
        setVariants(variants || []);
        setCategories(categories || []);
        setStockInfo(stockInfo || []);
        if (variants.length > 0) {
          setSelectedSku(variants[0].sku);
          setSelectedVariantId(variants[0].variant_id); // Set initial variant_id
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to fetch product details');
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
        productId: product.product_id,
        variantId: selectedVariantId, // Pass variant_id in the post request
        sku: selectedSku,
        quantity,
        email,
      });

      toaster.show({
        intent: Intent.SUCCESS,
        message: 'Product added to cart!',
        timeout: 3000,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add product to cart';
      console.error('Error adding to cart:', errorMessage);

      toaster.show({
        intent: Intent.DANGER,
        message: errorMessage,
        timeout: 3000,
      });
    }
  };

  const handleGuestCheckout = async () => {
    if (!guestName || !guestEmail) {
        toaster.show({
            intent: Intent.DANGER,
            message: 'Please fill in your name and email!',
            timeout: 3000,
        });
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/api/guest-cart', {
            name: guestName,
            email: guestEmail,
            productId: product.product_id,
            variantId: selectedVariantId,
            sku: selectedSku,
            quantity,
        });

      console.log(response);


        if (response.status === 200) {
          localStorage.setItem('email', guestEmail);
          localStorage.setItem('token', response.data.token)
            toaster.show({
                intent: Intent.SUCCESS,
                message: 'Product added to cart for guest!',
                timeout: 3000,
            });
            setIsGuestModalOpen(false);
        } else {
            toaster.show({
                intent: Intent.WARNING,
                message: response.data.message,
                timeout: 3000,
            });
        }
    } catch (error) {
        toaster.show({
            intent: Intent.DANGER,
            message: 'Error during guest checkout',
            timeout: 3000,
        });
        console.error('Guest checkout error:', error);
    }
};


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        {loading && <div className="text-center text-xl">Loading product...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {product && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img
                src={`http://localhost:5000${product.image || ''}`}
                alt={product.product_name}
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">{product.product_name}</h2>
              <p className="text-lg mb-4">{product.description}</p>

              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Choose SKU:</h3>
                <div className="flex gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.sku}
                      onClick={() => {
                        setSelectedSku(variant.sku);
                        setSelectedVariantId(variant.variant_id); // Update variant_id when changing SKU
                      }}
                      className={`px-4 py-2 rounded ${
                        selectedSku === variant.sku ? 'bg-blue-600' : 'bg-gray-500'
                      }`}
                    >
                      {variant.sku} - ${variant.price}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold">Quantity:</h3>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 px-2 rounded"
                    onClick={() => changeQuantity(-1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="mx-2 text-center w-12 bg-gray-700 rounded"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="bg-gray-500 hover:bg-gray-600 px-2 rounded"
                    onClick={() => changeQuantity(1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={addToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}

        <Dialog isOpen={isGuestModalOpen} onClose={() => setIsGuestModalOpen(false)} title="Guest Checkout">
          <div className="bp3-dialog-body">
            <input
              type="text"
              placeholder="Enter your name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="bp3-input mb-2"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="bp3-input mb-2"
            />
          </div>
          <div className="bp3-dialog-footer">
            <button className="bp3-button" onClick={handleGuestCheckout}>
              Continue as Guest
            </button>
            <button className="bp3-button bp3-intent-danger" onClick={() => setIsGuestModalOpen(false)}>
              Cancel
            </button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductDetailMain;
