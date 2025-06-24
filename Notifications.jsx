// src/components/Notification.jsx
import React, { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center animate-fadeIn">
        <i className="fas fa-bell text-xl mr-3"></i>
        <div>
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Notification;