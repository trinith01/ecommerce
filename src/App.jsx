import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './Pages/dashboard';
// Import your components/pages
// import Dropdown from './Pages/Dropdown';
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import CartPage from './Pages/CartPage';
import CategoryPage from './Pages/categorypage';
import CategoryDetail from './Pages/categorydetail';
import ProductDetailMain from './Pages/productdetailmain';
import ProductList from './Components/productList';
// import CartItems from './Components/CartItems/CartItems';
import OrderPage from './Pages/OrderPage';
import PaymentGateway from './Pages/PaymentGateway'; 
import Profile from './Pages/profile';

function App() {
  return (
    <Router>
      <Navbar /> {/* Place the Navbar inside the Router to ensure links work properly */}
      <div className='root'>
        <Routes>
        <Route path="/Home" element={<Home />} />
        
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:name/products" element={<CategoryDetail />} />
          
          <Route path="/categories/:name/products/:id" element={<ProductDetailMain />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          {/* <Route path="/dropdown" element={<Dropdown />} /> */}
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/cart" element={<CartItems />} /> */}
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
