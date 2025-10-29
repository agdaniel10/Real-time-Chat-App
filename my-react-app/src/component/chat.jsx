// import { useEffect, useState } from "react";
// import socket from "../socket";

// export default function Chat() {
//   const [username, setUsername] = useState("");
//   const [isJoined, setIsJoined] = useState(false);

//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   const joinChat = () => {
//     if (username.trim() !== "") {
//       setIsJoined(true);
//     }
//   };

//   const sendMessage = () => {
//     const data = { 
//       sender: username, 
//       text: message 
//     };
//     socket.emit("send_message", data);
//     setMessage("");
//   };

//   if (!isJoined) {
//     return (
//       <div>
//         <h2>Enter Username</h2>
//         <input 
//           value={username} 
//           onChange={(e) => setUsername(e.target.value)} 
//           placeholder="Your name..."
//         />
//         <button onClick={joinChat}>Join Chat</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Chat</h2>

//       <div style={{ border: "1px solid black", padding: "10px", height: "200px", overflowY: "scroll" }}>
//         {chat.map((msg, index) => (
//           <p key={index}><b>{msg.sender}:</b> {msg.text}</p>
//         ))}
//       </div>

//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type message..."
//         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//       />

//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }
