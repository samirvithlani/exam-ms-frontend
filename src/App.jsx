import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MainRouter from './components/Routers/Routers';
import axios from 'axios';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('https://exam-ms.onrender.com/'); // Adjust the URL if needed

function App() {
  useEffect(() => {
    // Listen for 'notification' events from the server
    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      showNotification('New Notification', data); // Show a toast notification with the message
    });

    // Cleanup on unmount
    return () => {
      socket.off('notification');
    };
  }, []);

  const showNotification = (title, message) => {
    toast.info(`${title}: ${message}`);
  };

  const token = Cookies.get('token');
  const [count, setCount] = useState(0);
  // axios.defaults.baseURL = "https://exambackendms.onrender.com/";
  // axios.defaults.baseURL = "http://localhost:3000/";
  axios.defaults.baseURL = "https://exam-ms.onrender.com/";
  console.log =()=>{};

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token');
        console.log(token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <>
      <ToastContainer />
      <MainRouter />
    </>
  );
}

export default App;
