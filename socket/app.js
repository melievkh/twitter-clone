// socket-server/src/index.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

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

  socket.on("message", (data) => {});

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const socketPort = 4001;
server.listen(socketPort, () => {
  console.log(`Socket.IO server listening on port ${socketPort}`);
});
