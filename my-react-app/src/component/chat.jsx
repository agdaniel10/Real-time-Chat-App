import { useEffect, useState } from "react";
import socket from "../socket";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Runs when component mounts
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    // Listen for messages from the backend
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]); 
    });

    // Cleanup when component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    const data = { text: message };
    socket.emit("send_message", data);
    setChat((prev) => [...prev, data]); 
    setMessage("");
  };

  

  return (
    <div>
      <h2>Chat</h2>

      <div style={{ border: "1px solid black", padding: "10px", height: "200px", overflowY: "scroll" }}>
        {chat.map((msg, index) => (
          <p key={index}>{msg.text}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
