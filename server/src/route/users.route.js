const { createTweet } = require("../controller/tweet.controller");
const { getUserById, getUsers } = require("../controller/user.controller");

const router = require("express").Router();

router.get("/", getUsers);
router.post("/create", createTweet);
router.get("/:id", getUserById);

module.exports = router;
