import React, { useState, useEffect } from 'react';

const Order = () => {
  // Hardcoded user data for the demo (assuming the user is registered or not)
  const registeredUser = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: {
      line1: '123 Main St',
      line2: '',
      city: 'Colombo',
      district: 'Western',
      zip_code: '00007'
    },
    deliveryMethod: 'Standard Delivery',
    isRegistered: true
  };

  // Hardcoded cart data
  const cartItems = [
    {
      id: 1,
      name: 'T-Shirt',
      image: 'https://via.placeholder.com/100',
      quantity: 2,
      price: 1500
    },
    {
      id: 2,
      name: 'Shoes',
      image: 'https://via.placeholder.com/100',
      quantity: 1,
      price: 3500
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    district: '',
    zip_code: '',
    deliveryMethod: 'Standard Delivery',
    contactEmail: '',
    contactPhone: ''
  });

  const [deliveryEstimate, setDeliveryEstimate] = useState('');

  useEffect(() => {
    // If the user is registered, pre-fill their data
    if (registeredUser.isRegistered) {
      setFormData({
        ...formData,
        deliveryMethod: registeredUser.deliveryMethod,
        contactEmail: registeredUser.email,
        contactPhone: registeredUser.phone
      });
    }
  }, []);

  useEffect(() => {
    // Calculate delivery estimate based on the address and delivery method
    const estimateTime = calculateDeliveryEstimate(
      formData.city,
      formData.deliveryMethod
    );
    setDeliveryEstimate(estimateTime);
  }, [formData.city, formData.deliveryMethod]);

  const calculateDeliveryEstimate = (city, deliveryMethod) => {
    // Hardcoded delivery times for demonstration
    const cityDeliveryTimes = {
      Colombo: 1,
      Kandy: 2,
      Galle: 3
    };

    const deliveryDays = cityDeliveryTimes[city] || 5;
    return deliveryMethod === 'Express Delivery'
      ? `${deliveryDays - 1} days`
      : `${deliveryDays} days`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container flex gap-10 justify-between mx-auto p-4 text-white">
      
      
      <div className='w-1/2 pt-32'>
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>

        {registeredUser.isRegistered && (
          <>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className="block">
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                />
              </label>
              <label className="block">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                />
              </label>
              <label className="block">
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                />
              </label>
              <label className="block">
                Address Line 1:
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                />
              </label>
              <label className="block">
                Address Line 2:
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                />
              </label>
              <label className="block">
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                />
              </label>
              <label className="block">
                District:
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                />
              </label>
              <label className="block">
                Zip Code:
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mt-1"
                />
              </label>
            </div>
          </>
        )}

        <h2 className="text-xl font-semibold mb-4 text-white bg-transparent">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-white">
          <label className="block">
            Contact Email:
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              disabled={registeredUser.isRegistered}
            />
          </label>
          <label className="block">
            Contact Phone:
            <input
              type="text"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2 mt-1"
              disabled={registeredUser.isRegistered}
            />
          </label>
        </div>

        <h2 className="text-xl font-semibold mb-4">Delivery Method</h2>
        <div className="mb-6">
          <label className="block mb-2">
            Delivery Method :
            <select
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onChange={handleChange}
              className="ml-10 border border-gray-300 rounded min-w-[300px] p-2 mt-1 text-black"
            >
              <option value="Standard Delivery" className='text-black'>Standard Delivery</option>
              <option value="Express Delivery" className='text-black'>Express Delivery</option>
            </select>
          </label>
          <p className="mt-2 bg-transparent text-white">Estimated delivery time: {deliveryEstimate}</p>
        </div>
        
      </div>
      <div className='w-1/2 pt-32'>
      <div className='w-full flex justify-between items-center mb-10'>
        <p className="mb-6 bg-transparent text-white text-2xl font-bold">Total Price: Rs.{totalPrice}</p>

        <button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-4 rounded-xl">
          Submit Order
        </button>
      </div>
        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
        <div className="grid gap-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border p-4 rounded">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
              <div>
                <p className="font-semibold text-white bg-transparent">{item.name}</p>
                <p className='text-white bg-transparent'>Quantity: {item.quantity}</p>
                <p className='text-white bg-transparent'>Total Price: Rs.{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
