const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const Message = require("./models/Message");

const app = express();
app.use(cors());

const server = http.createServer(app);

// ✅ CONNECT DB (optional for now)
mongoose
  .connect("mongodb+srv://chatuser:Maaislove%4005@cluster0.xs03vyo.mongodb.net/chat-app?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.log("MongoDB error", err));

// ✅ SOCKET
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ JOIN ROOM
  socket.on("join_room", async ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined ${room}`);

    try {
      const messages = await Message.find({ room });
      socket.emit("chat_history", messages);
    } catch (err) {
      console.log("Skipping DB history");
      socket.emit("chat_history", []); // fallback
    }
  });

  // ✅ SEND MESSAGE (FIXED)
  socket.on("send_message", async (data) => {
    console.log("MESSAGE RECEIVED:", data);

    // 🔥 ALWAYS EMIT FIRST (IMPORTANT)
    io.to(data.room).emit("receive_message", data);

    // 🔥 TRY SAVING (but don't block UI)
    try {
      const newMessage = new Message(data);
      await newMessage.save();
    } catch (err) {
      console.log("Skipping DB save");
    }
  });

  // ✅ TYPING
  socket.on("typing", ({ username, room }) => {
    socket.to(room).emit("typing", username);
  });

  socket.on("stop_typing", ({ room }) => {
    socket.to(room).emit("stop_typing");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ FIX PORT (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});