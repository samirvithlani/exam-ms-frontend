import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const socket = io("https://exam-ms.onrender.com/"); // Adjust the URL if needed

export const Annouement = () => {
  const [message, setMessage] = useState("");

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
    //toast.info(`${title}: ${body}`);
  };

  const sendMessage = async () => {
    try {
      await axios.post("/api/notify", { message });
      console.log("Message sent:", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      {/* <ToastContainer /> */}
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
