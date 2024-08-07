import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const socket = io("https://exam-ms.onrender.com/"); // Adjust the URL if needed

export const Annouement = () => {
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [moduleNames, setModuleNames] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const userId = Cookies.get("_id");
  useEffect(() => {
    // Request notification permission on component mount
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          toast.error("Permission to show notifications was denied");
        }
      });
    }

    // Connect to the server and set up event listeners
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Listen for 'notification' events from the server
    socket.on("notification", (data) => {
      console.log("Received notification:", data);
      showNotification("New Notification", data); // Show a push notification with the message
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("notification");
    };
  }, []);

  const showNotification = (title, body) => {
    // toast.info(`${title}: ${body}`);
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get("/module");
      console.log(response.data);
      setModuleNames(response.data.data); 
      console.log(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const sendMessage = async () => {
    try {
      const currentDateTime = new Date().toISOString();
      await axios.post("/api/notify", { message});
      const data = {
        title: message,
        description: description,
        anoouced_by: userId,
        type: selectedModule,
        isActive: true,
        date_time: currentDateTime
      };
      await axios.post('/announcement', data);
      
      setMessage("");
      setDescription("");
      setSelectedModule("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
      <ToastContainer />
      <h1>Announcement</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        style={{ marginBottom: '10px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        style={{ marginBottom: '10px' }}
      />
      <select
        value={selectedModule}
        onChange={(e) => setSelectedModule(e.target.value)}
        style={{ marginBottom: '10px' }}
      >
        <option value="">Select Module</option>
        {moduleNames.map((module, index) => (
          <option key={index} value={module._id}>
            {module.name}
          </option>
        ))}
      </select>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};
