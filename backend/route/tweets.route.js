const {
  getById,
  createTweet,
  getTweets,
  deleteTweet,
} = require("../controller/tweet.controller");
const { authentication } = require("../middleware/auth.middleware");
const validator = require("../middleware/validation.middleware");
const { tweetSchema } = require("../schema/tweet.schema");

const router = require("express").Router();

router.get("/:id", getById);
router.post("/create", tweetSchema, validator, createTweet);
router.delete("/delete/:id", deleteTweet);
router.get("/", getTweets);

module.exports = router;
