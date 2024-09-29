import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Electronics from './Pages/Electronics';
import Toys from './Pages/Toys';
import CategoryDetail from './Pages/categorydetail';
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Electronics from './Pages/Electronics';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import ProductList from './Components/productList';
import ProductDetail from './Pages/productDetail';
import ProductDetailMain from './Pages/productdetailmain';
import CategoryPage from './Pages/categorypage';

function App() {
  return (
    <Router>
      <Navbar /> {/* Place the Navbar inside the Router to ensure links work properly */}
      <div className='root'>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/electronics" element={<Electronics />} />
          <Route path="/toys" element={<Toys />} /> */}
          {/* <Route path='/Electronics' element={<ShopCategory category="electronics" />} /> */}
          <Route path='/toys' element={<ShopCategory category="toys" />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/plroduct" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/categories" element={<CategoryPage />} />
      <Route path="/categories/:name/products" element={<CategoryDetail />} /> {/* Corrected component name */}
      <Route path="/categories/:name/products/:id" element={<ProductDetailMain />} />
    
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" element={<Home />} />
        {/* <Route path="categories/:category/products/:id" element={<ProductDetail />} /> */}
        {/* <Route path="/categories/:category" element={<ShopCategory />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
