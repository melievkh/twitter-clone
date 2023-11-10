const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
require("dotenv").config();

const authRoute = require("./src/route/auth.route");
const usersRoute = require("./src/route/users.route");
const messageRoute = require("./src/route/messages.route");
const tweetsRoute = require("./src/route/tweets.route");
const { invalidRoute } = require("./src/error");
const { verifyAccessToken } = require("./src/middleware/auth.middleware");
const db = require("./src/queries");

const app = express();
const PORT = process.env.PORT | 4000;
db.initDatabase();
app.use(cors());
app.use(express.json());

const server = createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", authRoute);
app.use("/users", verifyAccessToken, usersRoute);
app.use("/messages", verifyAccessToken, messageRoute);
app.use("/tweets", verifyAccessToken, tweetsRoute);
app.use("/*", invalidRoute);

server.listen(PORT, () => console.log(`Server is running port on ${PORT}`));
