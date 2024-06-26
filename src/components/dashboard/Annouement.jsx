import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://exam-ms.onrender.com/'); // Adjust the URL if needed

export const Annouement = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Connect to the server and set up event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for 'notification' events from the server
    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      alert(`New notification: ${data}`); // Show an alert with the notification message
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('notification');
    };
  }, []);

  const sendMessage = async () => {
    try {
      await axios.post('api/notify', { message });
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Announcement</h1>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Enter your message" 
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};
