const express = require("express");
const http = require("http");
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
  console.log("Socket connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    const { recipient_id, sender_id, message } = data;
    try {
      await pool.query(
        "INSERT INTO chat_messages (recipient_id, sender_id, message) VALUES ($1, $2, $3)",
        [recipient_id, sender_id, message],
      );

      const result = await pool.query(
        "SELECT * FROM chat_messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)",
        [sender_id, recipient_id],
      );

      const storedMessages = result.rows;

      socket.emit("storedMessages", storedMessages);
      io.to(recipient_id).emit("storedMessages", storedMessages);
    } catch (error) {
      console.error("Error storing message:", error);
    }
  });

  socket.on("joinRoom", (recipientId) => {
    socket.join(recipientId);
  });

  socket.on("getStoredMessages", async (data) => {
    const { recipient_id, sender_id } = data;
    try {
      const result = await pool.query(
        "SELECT * FROM chat_messages WHERE recipient_id = $1 AND sender_id = $2",
        [recipient_id, sender_id],
      );
      const storedMessages = result.rows;

      io.to(socket.id).emit("storedMessages", storedMessages);
    } catch (error) {
      console.error("Error retrieving stored messages:", error);
    }
  });

  socket.join(`user:${socket.id}`);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const socketPort = process.env.SOCKET_PORT | 4003;
server.listen(socketPort, () => {
  console.log(`Socket.IO server listening on port ${socketPort}`);
});
