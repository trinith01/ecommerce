import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Electronics from './Pages/Electronics';
import Toys from './Pages/Toys';
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Product from './Pages/Product';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import ProductList from './Components/productList';

function App() {
  return (
    <Router>
      <Navbar /> {/* Place the Navbar inside the Router to ensure links work properly */}
      <div className='root'>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/electronics" element={<Electronics />} />
          <Route path="/toys" element={<Toys />} /> */}
          <Route path='/Electronics' element={<ShopCategory category="electronics" />} />
          <Route path='/toys' element={<ShopCategory category="toys" />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shopcategory" element={<ShopCategory />} />
          <Route path="/products" element={<ProductList />} />
          <Route path='/product'>
            <Route path=':productId' element={<Product />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
