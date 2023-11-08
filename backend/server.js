const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createServer } = require("http");

const authRoute = require("./route/auth.route");
const usersRoute = require("./route/users.route");
const messageRoute = require("./route/messages.route");
const tweetsRoute = require("./route/tweets.route");
const { invalidRoute } = require("./error");
const db = require("./queries");
const { authentication } = require("./middleware/auth.middleware");

const app = express();
const PORT = process.env.PORT | 4000;
dotenv.config();
db.initDatabase();
app.use(cors());
app.use(express.json());

const server = createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", authRoute);
app.use("/users", authentication, usersRoute);
app.use("/messages", authentication, messageRoute);
app.use("/tweets", authentication, tweetsRoute);
app.use("/*", invalidRoute);

server.listen(PORT, () => console.log(`Server is running port on ${PORT}`));
