// socket-server/src/index.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const kafka = require("kafka-node");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const kafkaClient = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("message", (data) => {
    // Handle Kafka producer logic here
    // Example: Produce message to Kafka topic
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const socketPort = 4001;
server.listen(socketPort, () => {
  console.log(`Socket.IO server listening on port ${socketPort}`);
});
