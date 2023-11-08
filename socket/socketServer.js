const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const kafka = require("kafka-node");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

const kafkaClient = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(kafkaClient);

producer.on("ready", () => {
  console.log("Kafka producer is ready");
});

producer.on("error", (err) => {
  console.error("Error with Kafka producer:", err);
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("message", (data) => {
    producer.send(
      [
        {
          topic: "chat-topic",
          messages: JSON.stringify(data),
        },
      ],
      (err, data) => {
        if (err) {
          console.error("Error sending message to Kafka:", err);
        } else {
          console.log("Message sent to Kafka:", data);
        }
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const sockerPort = 4001;

server.listen(sockerPort, () => {
  console.log(`Socket.io server listening on port ${sockerPort}`);
});
