// src/components/chat/ChatInterface.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';

const ChatInterface = () => {
  const { user } = useAuth();
  const { messages, conversations, activeConversation, users, setActiveConversation, sendMessage } = useChat();
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch conversations and users here
    // For this demo, we'll simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSendMessage = () => {
    if (messageInput.trim() && activeConversation) {
      sendMessage(messageInput, activeConversation.id);
      setMessageInput('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <i className="fas fa-comments mr-2 text-green-600"></i>
        Chat
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[600px]">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Conversations</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {users.map(u => (
                <div 
                  key={u.id}
                  className={`p-4 border-b cursor-pointer flex items-center ${
                    activeConversation?.id === u.id ? 'bg-green-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveConversation(u)}
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-green-700 font-bold">
                    {u.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{u.username}</div>
                    <div className="text-sm text-gray-500">Last message...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {activeConversation ? (
              <>
                <div className="p-4 border-b flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-green-700 font-bold">
                    {activeConversation.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{activeConversation.username}</div>
                    <div className="text-sm text-gray-500">Online</div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {messages
                    .filter(m => 
                      (m.sender === user.id && m.receiver === activeConversation.id) ||
                      (m.sender === activeConversation.id && m.receiver === user.id)
                    )
                    .map((message, index) => (
                      <div 
                        key={index} 
                        className={`mb-4 flex ${
                          message.sender === user.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === user.id 
                              ? 'bg-green-600 text-white rounded-br-none' 
                              : 'bg-white border rounded-bl-none'
                          }`}
                        >
                          <div>{message.content}</div>
                          <div className={`text-xs mt-1 ${
                            message.sender === user.id ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="p-4 border-t flex">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <i className="fas fa-comment-alt text-4xl mb-4"></i>
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;