// src/components/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  // Mock data for dashboard
  const stats = [
    { title: 'Total Users', value: 1245, icon: 'fas fa-users', color: 'bg-blue-500' },
    { title: 'Products', value: 568, icon: 'fas fa-box', color: 'bg-green-500' },
    { title: 'Today\'s Orders', value: 342, icon: 'fas fa-shopping-cart', color: 'bg-yellow-500' },
    { title: 'Total Revenue', value: '$12,540', icon: 'fas fa-dollar-sign', color: 'bg-purple-500' },
  ];
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <i className="fas fa-tachometer-alt mr-3 text-green-600"></i>
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <i className="fas fa-user mr-2 text-green-600"></i>
          Welcome, {user?.username}
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-3">Your Account</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Username:</span>
                <span className="font-medium">{user?.username}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Role:</span>
                <span className="font-medium">{user?.role}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Account Balance:</span>
                <span className="font-medium text-green-600">${user?.balance?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-green-100 text-green-700 py-3 rounded-lg flex flex-col items-center justify-center hover:bg-green-200 transition">
                <i className="fas fa-shopping-cart text-2xl mb-2"></i>
                <span>Place Order</span>
              </button>
              <button className="bg-blue-100 text-blue-700 py-3 rounded-lg flex flex-col items-center justify-center hover:bg-blue-200 transition">
                <i className="fas fa-history text-2xl mb-2"></i>
                <span>Order History</span>
              </button>
              {isAdmin && (
                <>
                  <button className="bg-yellow-100 text-yellow-700 py-3 rounded-lg flex flex-col items-center justify-center hover:bg-yellow-200 transition">
                    <i className="fas fa-users text-2xl mb-2"></i>
                    <span>Manage Users</span>
                  </button>
                  <button className="bg-purple-100 text-purple-700 py-3 rounded-lg flex flex-col items-center justify-center hover:bg-purple-200 transition">
                    <i className="fas fa-box text-2xl mb-2"></i>
                    <span>Manage Products</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {isAdmin && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <i className="fas fa-chart-line mr-2 text-green-600"></i>
            Recent Activity
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">Added new product</td>
                  <td className="px-6 py-4 whitespace-nowrap">10 minutes ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap">Placed an order</td>
                  <td className="px-6 py-4 whitespace-nowrap">25 minutes ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">Updated user balance</td>
                  <td className="px-6 py-4 whitespace-nowrap">1 hour ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;