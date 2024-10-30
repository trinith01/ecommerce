import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuarterlySalesReport from '../Components/QuarterlySalesReport';
import MostSoldProducts from '../Components/MostSoldProducts';
import CategoryMostOrders from '../Components/CategoryMostOrders';
import ProductInterestPeriod from '../Components/ProductInterestPeriod';
import CustomerOrderReport from '../Components/CustomerOrderReport';
import CategoryOrders from '../Components/CategoryOrders';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-bold mb-8 text-white">Platform Monitoring and Analytics</h1>
      <QuarterlySalesReport />
      <MostSoldProducts />
      <CategoryMostOrders />
      <CategoryOrders />
      <ProductInterestPeriod />
      <CustomerOrderReport />
    </div>
  );
};

export default AdminDashboard;