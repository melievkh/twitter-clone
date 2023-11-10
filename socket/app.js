const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connect", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const socketPort = process.env.SOCKET_PORT || 4003;
server.listen(socketPort, () => {
  console.log(`Socket.IO server listening on port ${socketPort}`);
});
