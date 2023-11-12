const router = require("express").Router();

const { getMessages } = require("../controller/message.controller");

router.get("/:recipient_id", getMessages);

module.exports = router;
