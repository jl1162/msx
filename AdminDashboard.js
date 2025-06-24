// AdminDashboard.js
import React from 'react';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <nav>{/* Navigation links */}</nav>
      </div>
      
      <div className="content">
        <Routes>
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Routes>
      </div>
    </div>
  );
}