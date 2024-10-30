// PaymentGateway.js

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
  const [paymentMethod, setPaymentMethod] = useState('card'); // State to manage payment method
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, email, phone } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      const paymentData = {
        cardNumber,
        expirationDate,
        cvv,
        amount,
      };

      try {
        const response = await axios.post('http://localhost:5000/api/payment', paymentData);

        toaster.show({
          message: response.data.message,
          intent: Intent.SUCCESS,
          timeout: 3000,
        });

        await fetch('http://localhost:5000/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, phone })
        });

        setCardNumber('');
        setExpirationDate('');
        setCvv('');

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
    } else {
      // Handle cash payment logic here
      toaster.show({
        message: 'Cash payment submitted successfully!',
        intent: Intent.SUCCESS,
        timeout: 3000,
      });

      // You can navigate or perform further actions for cash payment
      setTimeout(() => {
        navigate('/categories');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00143c] p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Secure Payment Gateway</h2>
        <div className="mb-4">
          <label className="mr-2">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Card Payment
          </label>
          <label>
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            Cash Payment
          </label>
        </div>
        <form className="payment-form" onSubmit={handleSubmit}>
          {paymentMethod === 'card' && (
            <>
              <div className="form-group mb-4">
                <label className="form-label block text-sm font-medium text-gray-700">Card Number</label>
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
                <label className="form-label block text-sm font-medium text-gray-700">Expiration Date (MM/YY)</label>
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
          {paymentMethod === 'cash' && (
            <div className="form-group mb-4">
              <label className="form-label block text-sm font-medium text-gray-700">Total Amount</label>
              <input
                className="form-input mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                type="text"
                value={amount}
                readOnly
              />
            </div>
          )}
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