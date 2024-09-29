import React, { useState } from 'react';
import axios from 'axios';
import './PaymentGateway.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom'; 
import { Toaster, Position, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';

const toaster = Toaster.create({
  position: Position.TOP,
});

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      cardNumber,
      expirationDate,
      cvv,
      amount,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/payment', paymentData);
      // Show success toaster notification
      toaster.show({
        message: response.data.message, // Corrected to use response.data.message
        intent: Intent.SUCCESS,
        timeout: 3000,
      });
      
      // Clear form fields
      setCardNumber('');
      setExpirationDate('');
      setCvv('');
      setAmount('');

      // Navigate to the /categories page after a successful payment
      setTimeout(() => {
        navigate('/categories'); // Redirect to categories page
      }, 3000); // 3 seconds delay before navigation
      
    } catch (error) {
      console.error('Error processing payment:', error);
      // Show error toaster notification
      const errorMessage = error.response?.data?.message || 'Error processing payment!'; // Use optional chaining to avoid errors
      toaster.show({
        message: errorMessage,
        intent: Intent.DANGER,
        timeout: 3000,
      });
    }
  };

  return (
    <div className="payment-gateway">
      <h2 className="payment-title">Secure Payment Gateway</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Card Number</label>
          <input
            className="form-input"
            type="text"
            placeholder="1234 5678 9123 4567"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Expiration Date (MM/YY)</label>
          <input
            className="form-input"
            type="text"
            placeholder="MM/YY"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">CVV</label>
          <input
            className="form-input"
            type="password"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            className="form-input"
            type="text"
            placeholder="$0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Payment</button> {/* Removed the Link here */}
      </form>
    </div>
  );
};

export default PaymentGateway;
