const {
  getById,
  createTweet,
  getTweets,
  deleteTweet,
  getTweetsByUserId,
} = require("../controller/tweet.controller");

const router = require("express").Router();

router.get("/:userId", getTweetsByUserId);
router.post("/create", createTweet);
router.delete("/delete/:id", deleteTweet);
router.get("/", getTweets);

module.exports = router;
