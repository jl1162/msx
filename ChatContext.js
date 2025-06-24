// src/context/ChatContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children, socket }) {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    if (!socket) return;
    
    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    // Cleanup
    return () => {
      socket.off('newMessage');
    };
  }, [socket]);
  
  // Fetch initial conversations
  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/messages');
      setConversations(response.data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };
  
  // Fetch users for chat
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  
  const sendMessage = (content, receiverId) => {
    if (!socket || !receiverId) return;
    
    socket.emit('sendMessage', {
      sender: user.id,
      receiver: receiverId,
      content
    });
  };
  
  const value = {
    messages,
    conversations,
    activeConversation,
    users,
    setActiveConversation,
    fetchConversations,
    fetchUsers,
    sendMessage
  };
  
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  return useContext(ChatContext);
}