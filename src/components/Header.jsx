// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ onToggleSidebar, setSearchTerm }) => {
  const [searchTermInput, setSearchTermInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check for a saved token in localStorage (or other auth method)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTermInput.trim()); // Set the search term in App
    navigate('/products'); // Navigate to ProductList to show search results
    setSearchTermInput(''); // Clear input after search
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token or session data
    setIsLoggedIn(false); // Update state
    navigate('/'); // Redirect to home or login page
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="text-white">
          <FaBars className="text-xl" />
        </button>
        <div className="text-2xl font-bold ml-2">E-Store</div>
      </div>
      <form onSubmit={handleSearch} className="flex flex-grow text-black mx-4 max-w-xl">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTermInput}
          onChange={(e) => setSearchTermInput(e.target.value)}
          className="p-2 rounded-l-md flex-grow focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 p-2 rounded-r-md text-white">
          Search
        </button>
      </form>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/products" className="hover:underline">Products</Link></li>
          <li><Link to="/cart" className="hover:underline">Cart</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/profile" className="hover:underline">Profile</Link></li>
             


            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
