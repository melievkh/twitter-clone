const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const pool = require("../server/src/config/db.config");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connect", (socket) => {
  console.log("Socket connected");

  socket.on("sendMessage", async (data) => {
    const { recipient_id, sender_id, message } = data;
    console.log(data);
    try {
      await pool.query(
        "INSERT INTO conversation (recipient_id, sender_id, message) VALUES ($1, $2, $3)",
        [recipient_id, sender_id, message],
      );
    } catch (error) {
      console.error("Error storing message:", error);
    }
  });

  // socket.on("joinRoom", (recipientId) => {
  //   console.log("joined to room");
  //   socket.join(recipientId);
  // });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

const socketPort = process.env.SOCKET_PORT || 4003;
server.listen(socketPort, () => {
  console.log(`Socket.IO server listening on port ${socketPort}`);
});
