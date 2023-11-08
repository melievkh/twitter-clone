const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("privateMessage", ({ recipientId, message }) => {
    io.to(recipientId).emit("privateMessage", { senderId: socket.id, message });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const SOCKET_PORT = process.env.SOCKET_PORT | 4001;

server.listen(SOCKET_PORT, () => {
  console.log(`Socket server is running on port ${SOCKET_PORT}`);
});
