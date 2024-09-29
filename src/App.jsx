import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components/pages
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import CartPage from './Pages/CartPage';
import CategoryPage from './Pages/categorypage';
import CategoryDetail from './Pages/categorydetail';
import ProductDetailMain from './Pages/productdetailmain';
import ProductList from './Components/productList';
// import CartItems from './Components/CartItems/CartItems';
import PaymentGateway from './Pages/PaymentGateway'; 

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
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/cart" element={<CartItems />} /> */}
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
