// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  
  const adminLinks = [
    { path: "/users", icon: "fas fa-users", label: "Users" },
    { path: "/products", icon: "fas fa-box", label: "Products" },
    { path: "/orders", icon: "fas fa-shopping-cart", label: "Orders" },
    { path: "/balance", icon: "fas fa-wallet", label: "Balance" },
  ];
  
  return (
    <div className="w-64 bg-white shadow-md h-full hidden md:block">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          <i className="fas fa-bars mr-2"></i> Menu
        </h2>
      </div>
      
      <nav className="p-2">
        <NavLink 
          to="/" 
          className={({isActive}) => 
            `flex items-center p-3 rounded-lg mb-1 ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </NavLink>
        
        {user?.role === 'admin' && adminLinks.map(link => (
          <NavLink 
            key={link.path}
            to={link.path} 
            className={({isActive}) => 
              `flex items-center p-3 rounded-lg mb-1 ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`
            }
          >
            <i className={`${link.icon} mr-3`}></i>
            {link.label}
          </NavLink>
        ))}
        
        <NavLink 
          to="/chat" 
          className={({isActive}) => 
            `flex items-center p-3 rounded-lg mb-1 ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <i className="fas fa-comments mr-3"></i>
          Chat
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;