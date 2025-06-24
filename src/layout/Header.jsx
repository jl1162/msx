// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold flex items-center">
              <i className="fas fa-shopping-basket mr-2"></i>
              FreshMart
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-green-600 px-3 py-1 rounded">Dashboard</Link>
            {user?.role === 'admin' && (
              <>
                <Link to="/users" className="hover:bg-green-600 px-3 py-1 rounded">Users</Link>
                <Link to="/products" className="hover:bg-green-600 px-3 py-1 rounded">Products</Link>
                <Link to="/orders" className="hover:bg-green-600 px-3 py-1 rounded">Orders</Link>
                <Link to="/balance" className="hover:bg-green-600 px-3 py-1 rounded">Balance</Link>
              </>
            )}
            <Link to="/chat" className="hover:bg-green-600 px-3 py-1 rounded">Chat</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4 relative">
          <div className="bg-green-800 px-3 py-1 rounded-full flex items-center">
            <i className="fas fa-wallet mr-2"></i>
            ${user?.balance?.toFixed(2) || '0.00'}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-green-700 font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline">{user?.username}</span>
              <i className={`fas fa-caret-down ${showDropdown ? 'transform rotate-180' : ''}`}></i>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link 
                  to="/" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <i className="fas fa-user mr-2"></i>Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
