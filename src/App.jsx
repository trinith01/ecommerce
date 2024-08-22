import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Electronics from './Pages/Electronics';
import Toys from './Pages/Toys';
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Navbar /> {/* Place the Navbar inside the Router to ensure links work properly */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
