const {
  getMessages,
  createMessage,
  getByUserId,
} = require("../controller/message.controller");

const router = require("express").Router();

router.get("/", getMessages);
router.post("/create", createMessage);
router.get("/:id", getByUserId);

module.exports = router;
