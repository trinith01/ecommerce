import React, { useState, useEffect } from "react";
import { Navbar, Alignment } from '@blueprintjs/core';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faUser, faSignOutAlt, faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email'); 
  const role = localStorage.getItem('role'); 

  const handleSignOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // localStorage.removeItem('name'); // Clear name from localStorage
    navigate('/signin');
  };

  const [openNavigation, setOpenNavigation] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subDropdownElectronics, setSubDropdownElectronics] = useState(false);
  const [subDropdownToys, setSubDropdownToys] = useState(false);

  let closeTimeout = null;

  // Handle dropdown menu open on hover
  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  // Handle sub-dropdown for Electronics
  const handleSubDropdownElectronicsEnter = () => {
    setSubDropdownElectronics(true);
  };

  const handleSubDropdownElectronicsLeave = () => {
    setSubDropdownElectronics(false);
  };

  // Handle sub-dropdown for Toys
  const handleSubDropdownToysEnter = () => {
    setSubDropdownToys(true);
  };

  const handleSubDropdownToysLeave = () => {
    setSubDropdownToys(false);
  };
  

  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, []);

  return (
    // <Navbar  style={{ backgroundColor: "#0071c1" }}  className="bp3-dark m-0 p-0" >
    //   <Navbar.Group align={Alignment.LEFT}>
        
    //     <Link to="/home" className="logo"> <FontAwesomeIcon icon={faHome} />&nbsp;C-Ex</Link>
    //     <Navbar.Divider />
    //     <Link to="/signin" className="nav-link" title="Sign In">
    //       <FontAwesomeIcon icon={faUser} />Sign In
    //     </Link>
    //     <Navbar.Divider />
    //     <Link to="/signup" className="nav-link" title="Sign Up">
    //       <FontAwesomeIcon icon={faUser} />Sign Up
    //     </Link>
    //     <Navbar.Divider />
    //     <Link to="/cart" className="nav-link" title="Cart">
    //       <FontAwesomeIcon icon={faShoppingCart} />Cart
    //     </Link>
    //     <Navbar.Divider />
    //     <Link to="/order" className="nav-link" title="Cart">
    //       <FontAwesomeIcon icon={faClipboardList} />Orders
    //     </Link>
    //   </Navbar.Group>

    //   <Navbar.Group align={Alignment.RIGHT}>
    //     {/* Display user greeting with name */}
    //     <Link to="/profile" className="nav-link" title="Profile">
    //     {email && (
    //       <span className="nav-link user-greeting">
    //         <FontAwesomeIcon icon={faUser} /> Hello, {email}!
    //       </span>
          
    //     )}
    //     </Link>
    //     <button className=" signout-button" title="Sign Out" onClick={handleSignOut}>
    //       <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
    //     </button>
    //   </Navbar.Group>


      <nav className="bg-gradient-to-r from-slate-900 to-slate-700 bg-opacity-80 border-white backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <Link className="text-4xl font-bold no-underline hover:no-underline bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 bg-clip-text text-transparent hover:text-transparent" to="/">
          C-Express
        </Link>

        {/* Navbar links */}
        <div className={`lg:flex justify-center items-center space-x-16 font-bold ${openNavigation ? 'block' : 'hidden'}`}>
          <Link
            to="/"
            className="text-white hover:text-white no-underline hover:no-underline hover:glow transition duration-300"
          >
            Home
          </Link>

          {/* Dropdown for Categories */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/categories"
              className="text-white relative bg-transparent no-underline hover:no-underline hover:glow transition duration-300"
            >
              Categories
            </Link>
          </div>

          <Link
            to="/cart"
            className="text-white hover:text-white no-underline hover:no-underline hover:glow transition duration-300"
          >
            <FontAwesomeIcon icon={faShoppingCart} />Cart
          </Link>
          {role === 'admin' && <Link
            to="/admin"
            className="text-white hover:text-white no-underline hover:no-underline hover:glow transition duration-300"
          >
            Admin Dashboard
          </Link>}
        </div>

        {/* Right-aligned buttons */}
        {!email ? (<div className="hidden lg:flex space-x-4 font-bold">
          <Link
            to="/signin"
            className="bg-transparent border border-white text-white py-2 px-4 rounded-xl no-underline hover:no-underline"
          >
            <FontAwesomeIcon icon={faUser} />Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-4 rounded-xl no-underline hover:no-underline"
          >
            <FontAwesomeIcon icon={faUser} />Sign Up
          </Link>
        </div>) : (
          <div className="hidden lg:flex space-x-4 font-bold items-center justify-center">
            <Link to="/profile" className="nav-link" title="Profile">
              {email && (
                <span className="nav-link user-greeting">
                  <FontAwesomeIcon icon={faUser} /> Hello, {email}!
                </span>
                
              )}
            </Link>
            <button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-4 rounded-xl no-underline hover:no-underline" title="Sign Out" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
    // </Navbar>
  );
};

export default NavBar;
