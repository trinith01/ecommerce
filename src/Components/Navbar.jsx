import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-700 bg-opacity-80  border-white backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <Link className="text-4xl font-bold no-underline hover:no-underline bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 bg-clip-text text-transparent hover:text-transparent" to="/">
          C-Express
        </Link>
        
        {/* Toggle button for mobile */}
        <div className="block lg:hidden">
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navbar links */}
        <div className="hidden lg:flex space-x-16 font-bold">
          <Link
            to="/"
            className="text-white hover:text-white no-underline hover:no-underline hover:glow transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/electronics"
            className="text-white hover:text-white no-underline hover:no-underline hover:glow transition duration-300"
          >
            Electronics
          </Link>
          <Link
            to="/toys"
            className="text-white hover:text-white no-underline hover:no-underline hover:glow transition duration-300"
          >
            Toys
          </Link>
          <button
          onClick={toggleDropdown}
          className="text-white relative hover:text-white no-underline hover:no-underline hover:glow transition duration-300"
        >
          Categories
        </button>
        {isDropdownOpen && (
          <div className="absolute bg-gray-800 text-white mt-2 rounded shadow-lg">
            <Link
              to="/electronics"
              className="block px-4 py-2 hover:bg-gray-700"
              onClick={() => setIsDropdownOpen(false)}
            >
              Electronics
            </Link>
            <Link
              to="/toys"
              className="block px-4 py-2 hover:bg-gray-700"
              onClick={() => setIsDropdownOpen(false)}
            >
              Toys
            </Link>
          </div>
        )}
          <Link
            to="/cart"
            className="text-white hover:text-white no-underline hover:no-underline hover:glow transition duration-300"
          >
            Cart
          </Link>
        </div>

        {/* Right-aligned buttons */}
        <div className="hidden lg:flex space-x-4 font-bold">
          <Link
            to="/signin"
            className="bg-transparent border border-white text-white py-2 px-4 rounded-3xl no-underline hover:no-underline"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-4 rounded-3xl no-underline hover:no-underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
