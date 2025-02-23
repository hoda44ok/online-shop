import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { cartContext } from "../CartContext/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  const { numOfItems } = useContext(cartContext);
  const { token, setToken } = useContext(AuthContext);
  const login = useNavigate();

  function logOut() {
    localStorage.removeItem("tkn"); // Remove token from localStorage
    setToken(null); // Set token to null to trigger re-render
    login("/login"); // Navigate to login page
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <i className="fa-solid fa-cart-shopping text-4xl text-blue-800 italic fa-bounce dark:text-white"></i>
          <span className="text-2xl ms-2 font-semibold text-gray-800 dark:text-white">FreshCart</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>

        {/* Desktop Navigation - Centered */}
        <ul className="hidden md:flex space-x-4 absolute left-1/2 -translate-x-1/2 text-gray-600 dark:text-gray-300">
          {token ? <>
            <li className="mx-2 my-3 md:my-0 hover:text-gray-800 dark:hover:text-white">
              <NavLink to="/">Home</NavLink>
            </li>

            <li className="mx-2 my-3 md:my-0 hover:text-black dark:hover:text-white transition duration-300">
              <NavLink to="/cart">Cart</NavLink>
            </li>

            <li className="mx-2 my-3 md:my-0 hover:text-black dark:hover:text-white transition duration-300">
              <NavLink to="/wishlist">WishList</NavLink>
            </li>
            <li className="mx-2 my-3 md:my-0 hover:text-black dark:hover:text-white transition duration-300">
              <NavLink to="/product">Products</NavLink>
            </li>
            <li className="mx-2 my-3 md:my-0 hover:text-black dark:hover:text-white transition duration-300">
              <NavLink to="/category">Categories</NavLink>
            </li>
            <li className="mx-2 my-3 md:my-0 hover:text-black dark:hover:text-white transition duration-300">
              <NavLink to="/brands">Brands</NavLink>
            </li>
            <li className="mx-2 my-3 md:my-0 hover:text-black dark:hover:text-white transition duration-300">
              <NavLink to="/allOrders">AllOrders</NavLink>
            </li>
            </> : ""}
          
        </ul>

        {/* Dark Mode Toggle Icon (mobile) */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-16 text-gray-800 dark:text-white text-xl z-10 md:hidden"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        {/* Cart & Logout - Right Side for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden md:flex items-center justify-center text-lg  text-gray-800 dark:text-white ml-4"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
            
              <NavLink to="/cart" className="relative">
                <i className="fa-solid fa-cart-shopping fa-2xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-300"></i>
                <span className="absolute bottom-4 left-6 w-5 h-5 text-xs font-bold text-white bg-blue-600 border-2 border-blue-600 rounded-md flex items-center justify-center">
                  {numOfItems}
                </span>
              </NavLink>
              <button onClick={logOut} className="text-gray-600 dark:text-white">Log out</button>
            </>
          ) : (
            <div className="flex space-x-3">
              <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden md:flex items-center justify-center text-lg  text-gray-800 dark:text-white ml-4"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
              <NavLink to="/register" className="hover:text-blue-600 dark:hover:text-blue-400">Register</NavLink>
              <NavLink to="/login" className="hover:text-blue-600 dark:hover:text-blue-400">Login</NavLink>
              
            </div>
            
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
          <ul className="flex flex-col items-center space-y-4 p-4">
            {token ? <><li><NavLink to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">Home</NavLink></li>
              <li><NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">Cart</NavLink></li>

              <li><NavLink to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">Wish List</NavLink></li>
              <li><NavLink to="/product" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">Products</NavLink></li>
              <li><NavLink to="/category" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">Categories</NavLink></li>
              <li><NavLink to="/brands" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">Brands</NavLink></li>
              <li><NavLink to="/allOrders" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">AllOrders</NavLink></li></> : ""}

            {/* Cart Icon in Mobile Menu */}
            {token && (
              <li>
                <NavLink to="/cart" className="relative flex items-center space-x-2 mt-2" onClick={() => setIsMenuOpen(false)}>
                  <i className="fa-solid fa-cart-shopping fa-xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-300"></i>
                  <span className="ml-2 w-5 h-5 absolute bottom-0 left-3 text-xs font-bold text-white bg-blue-600 rounded-full flex items-center justify-center">
                    {numOfItems}
                  </span>
                </NavLink>
              </li>
            )}

            {/* Logout Button in Mobile Menu */}
            {token ? (
              <li>
                <button onClick={logOut} className="text-gray-600 dark:text-white mt-2">Log out</button>
              </li>
            ) : (
              <>
                <li><NavLink to="/register" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">Register</NavLink></li>
                <li><NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300">Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
