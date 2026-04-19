import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";

import Login from "./components/Login";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [chat, setChat] = useState<any[]>([]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // ✅ Create socket ONLY ONCE
    socketRef.current = io("http://localhost:5000");

    const socket = socketRef.current;

    // ✅ Receive messages
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
    socket.on("chat_history", (messages) => {
  setChat(messages);
});

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = (name: string, roomName: string) => {
    if (!socketRef.current) return;

    setUsername(name);
    setRoom(roomName);

    socketRef.current.emit("join_room", {
      username: name,
      room: roomName,
    });

    setJoined(true);
  };

  const sendMessage = (message: string) => {
    if (!message.trim() || !socketRef.current) return;

    const msgData = {
      user: username,
      message,
      room,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socketRef.current.emit("send_message", msgData);
  };

  return !joined ? (
    <Login joinRoom={joinRoom} />
  ) : (
    <ChatWindow
      username={username}
      room={room}
      chat={chat}
      sendMessage={sendMessage}
      socketRef={socketRef}   // ✅ VERY IMPORTANT
    />
  );
}

export default App;