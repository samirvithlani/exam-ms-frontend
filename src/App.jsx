import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRouter from './components/Routers/Routers'
import axios from "axios";
import Cookies from 'js-cookie'
import { useEffect } from 'react'
function App() {
  const token = Cookies.get("token")
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = "https://exam-ms-royal.onrender.com/";
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token');
        console.log(token)
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
      {/* <AppContext.Provider value={{ count, setCount, data, setdata }}> */}
        <MainRouter/>
      {/* </AppContext.Provider>  */}
    </>
  )
}

export default App
