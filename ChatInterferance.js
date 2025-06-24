// ChatInterface.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function ChatInterface({ user, socket }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  useEffect(() => {
    socket.emit('join', user.id);
    
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    return () => {
      socket.off('newMessage');
    };
  }, [user]);
  
  const sendMessage = () => {
    const newMessage = {
      sender: user.id,
      receiver: 'admin', // Or selected user
      content: input,
      timestamp: new Date()
    };
    
    socket.emit('sendMessage', newMessage);
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };
  
  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map(msg => (
          <div key={msg.timestamp} className="message">
            {msg.content}
          </div>
        ))}
      </div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}