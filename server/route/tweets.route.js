const {
  getById,
  createTweet,
  getTweets,
  deleteTweet,
} = require("../controller/tweet.controller");

const router = require("express").Router();

router.get("/:id", getById);
router.post("/create", createTweet);
router.delete("/delete/:id", deleteTweet);
router.get("/", getTweets);

module.exports = router;
