import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

function Navbar() {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subDropdownElectronics, setSubDropdownElectronics] = useState(false);
  const [subDropdownToys, setSubDropdownToys] = useState(false);

  let closeTimeout = null;

  // Toggle mobile navigation
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

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
    <nav className="bg-gradient-to-r from-slate-900 to-slate-700 bg-opacity-80 border-white backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50">
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
            aria-controls="navbarNavAltMarkup"
            aria-expanded={openNavigation}
            aria-label="Toggle navigation"
            onClick={toggleNavigation}
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
            <button
              className="text-white relative bg-transparent no-underline hover:no-underline hover:glow transition duration-300"
            >
              Categories
            </button>
            {dropdownOpen && (
              <div className="absolute bg-gray-800 text-white mt-2 rounded-xl shadow-lg z-10">
                {/* Sub-dropdown for Electronics */}
                <div
                  onMouseEnter={handleSubDropdownElectronicsEnter}
                  onMouseLeave={handleSubDropdownElectronicsLeave}
                >
                  <Link
                    to="/electronics"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-t-xl text-white hover:text-white no-underline hover:no-underline"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Electronics
                  </Link>
                  {subDropdownElectronics && (
                    <div className="absolute left-full top-0 bg-gray-700 text-white mt-2 rounded-xl shadow-lg z-20">
                    <Link
                      to="/toys/action-figures"
                      className="block px-4 py-2 hover:bg-gray-600 rounded-t-xl text-white no-underline hover:no-underline whitespace-nowrap"
                    >
                      Laptops
                    </Link>
                    <Link
                      to="/toys/board-games"
                      className="block px-4 py-2 hover:bg-gray-600 rounded-b-xl text-white no-underline hover:no-underline"
                    >
                      Phone
                    </Link>
                  </div>
                  )}
                </div>

                {/* Sub-dropdown for Toys */}
                <div
                  onMouseEnter={handleSubDropdownToysEnter}
                  onMouseLeave={handleSubDropdownToysLeave}
                >
                  <Link
                    to="/toys"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-b-xl text-white hover:text-white no-underline hover:no-underline"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Toys
                  </Link>
                  {subDropdownToys && (
                    <div className="absolute left-full top-0 bg-gray-700 text-white mt-12 rounded-xl shadow-lg z-20">
                      <Link
                        to="/toys/action-figures"
                        className="block px-4 py-2 hover:bg-gray-600 rounded-t-xl text-white no-underline hover:no-underline whitespace-nowrap"
                      >
                        Action Figures
                      </Link>
                      <Link
                        to="/toys/board-games"
                        className="block px-4 py-2 hover:bg-gray-600 rounded-b-xl text-white no-underline hover:no-underline"
                      >
                        Board Games
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

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
