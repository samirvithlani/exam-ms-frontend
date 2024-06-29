import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainRouter from "./components/Routers/Routers";
import axios from "axios";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { constant } from "./constant";
import { GlobalStyles } from "@mui/material";
import { motion, useScroll } from "framer-motion";

const socket = io("https://exam-ms.onrender.com/"); // Adjust the URL if needed

function App() {
  useEffect(() => {
    // Listen for 'notification' events from the server
    socket.on("notification", (data) => {
      console.log("Received notification:", data);
      showNotification("New Notification", data); // Show a toast notification with the message
    });

    // Cleanup on unmount
    return () => {
      socket.off("notification");
    };
  }, []);

  const showNotification = (title, message) => {
    toast.info(`${title}: ${message}`);
  };

  const token = Cookies.get("token");
  const [count, setCount] = useState(0);
  // axios.defaults.baseURL = "https://exambackendms.onrender.com/";
  // axios.defaults.baseURL = "http://localhost:3000/";
  axios.defaults.baseURL = "https://exam-ms.onrender.com/";
  // console.log =()=>{};
  const GlobalScrollbarStyles = ({ backgroundColor }) => (
    <GlobalStyles
      styles={{
        "*::-webkit-scrollbar": {
          width: "10px",
          height: "2px",
        },
        "*::-webkit-scrollbar-track": {
          background: "white",
        },
        "*::-webkit-scrollbar-thumb": {
          background: backgroundColor,
          borderRadius: "1px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: backgroundColor,
        },
      }}
    />
  );

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get("token");
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
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          height: 4,
          backgroundColor: "#3f51b5",
          transformOrigin: "0%",
          zIndex: 1000,
          scaleX: scrollYProgress,
        }}
      />
      <GlobalScrollbarStyles backgroundColor={constant.backgroundColor} />
      <ToastContainer />
      <MainRouter />
    </>
  );
}

export default App;
