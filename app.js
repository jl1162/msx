// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import OrderManagement from './components/admin/OrderManagement';
import BalanceManagement from './components/admin/BalanceManagement';
import ChatInterface from './components/chat/ChatInterface';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Notification from './components/Notification';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

// Socket setup
const socket = io('http://localhost:5000', {
  transports: ['websocket'],}
  autoConnect: false
});

function App() {
  return (
    <AuthProvider>
      <ChatProvider socket={socket}>
        <Router>
          <AppContent />
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  
  // Connect to socket when user is authenticated
  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit('joinUserRoom', user.id);
      
      // Listen for balance updates
      socket.on('balanceUpdate', (data) => {
        setNotifications(prev => [...prev, {
          id: Date.now(),
          type: 'balance',
          message: data.notification.message,
          balance: data.balance
        }]);
        setShowNotification(true);
        
        // Hide notification after 5 seconds
        setTimeout(() => setShowNotification(false), 5000);
      });
      
      // Cleanup on unmount
      return () => {
        socket.off('balanceUpdate');
        socket.disconnect();
      };
    }
  }, [user]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Header />}
      
      <div className="flex">
        {user && <Sidebar />}
        
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute adminOnly>
                <UserManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/products" element={
              <ProtectedRoute adminOnly>
                <ProductManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/orders" element={
              <ProtectedRoute adminOnly>
                <OrderManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/balance" element={
              <ProtectedRoute adminOnly>
                <BalanceManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatInterface />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
      
      {showNotification && notifications.length > 0 && (
        <Notification 
          message={notifications[notifications.length - 1].message}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

// Protected route component
function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default App;