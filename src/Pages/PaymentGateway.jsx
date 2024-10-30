import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, Position, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useNavigate, useLocation } from 'react-router-dom';

const toaster = Toaster.create({
  position: Position.TOP,
});

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryMethod, setDeliveryMethod] = useState('Cash');
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    District: '',
    'zip': '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || {};

  const email = localStorage.getItem('email');
  const phone = localStorage.getItem('phone');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      paymentMethod,
      deliveryMethod,
      amount
      // address,
    };

    try {
      // const response = await axios.post('http://localhost:5000/api/payment', paymentData);

      // toaster.show({
      //   message: response.data.message,
      //   intent: Intent.SUCCESS,
      //   timeout: 3000,
      // });

      await axios.post('http://localhost:5000/api/order', {
        email,
        phone,
        address,
        amount,
        deliveryMethod,
        paymentMethod
      });

      await axios.delete('http://localhost:5000/api/items', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setCardNumber('');
      setExpirationDate('');
      setCvv('');
      setAddress({
        line1: '',
        line2: '',
        city: '',
        District: '',
        'zip': '',
      });

      setTimeout(() => {
        navigate('/categories');
      }, 3000);
    } catch (error) {
      console.error('Error processing payment:', error);
      const errorMessage = error.response?.data?.message || 'Error processing payment!';
      toaster.show({
        message: errorMessage,
        intent: Intent.DANGER,
        timeout: 3000,
      });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00143c] p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Secure Payment Gateway</h2>

        <div className="mb-4">
          <label className="mr-2">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'Card'}
              onChange={() => setPaymentMethod('Card')}
            />
            Card Payment
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="Cash"
              checked={paymentMethod === 'Cash'}
              onChange={() => setPaymentMethod('Cash')}
            />
            Cash Payment
          </label>
        </div>

        <div className="mb-4">
          <label className="mr-2">
            <input
              type="radio"
              value="Delivery"
              checked={deliveryMethod === 'Delivery'}
              onChange={() => setDeliveryMethod('Delivery')}
            />
            Delivery
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="Store Pickup"
              checked={deliveryMethod === 'Store Pickup'}
              onChange={() => setDeliveryMethod('Store Pickup')}
            />
        Store Pickup
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.keys(address).map((field, index) => (
            <div key={index}>
              <label className="form-label block text-sm font-medium text-gray-700">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type="text"
                name={field}
                value={address[field]}
                onChange={handleAddressChange}
                className="form-input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder={`Enter ${field}`}
                required={field === 'line1'}
              />
            </div>
          ))}
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          {paymentMethod === 'Card' && (
            <>
              <div className="form-group mb-4">
                <label className="form-label block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  className="form-input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  type="text"
                  placeholder="1234 5678 9123 4567"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label block text-sm font-medium text-gray-700">
                  Expiration Date (MM/YY)
                </label>
                <input
                  className="form-input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  type="text"
                  placeholder="MM/YY"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label block text-sm font-medium text-gray-700">CVV</label>
                <input
                  className="form-input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  type="password"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              className="form-input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              type="text"
              value={amount}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
