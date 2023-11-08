const { errorHandler, CustomError } = require("../error");
const db = require("../queries");

const getTweets = async (req, res) => {
  try {
    const tweets = await db.getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const createTweet = async (req, res) => {
  try {
    const { userId } = req;
    const { caption } = req.body;
    console.log(caption, "caption");
    await db.createTweet(caption, userId);
    res.status(201).json({ message: "created tweet successfully!" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTweet = await db.getTweetById(id);
    if (!foundTweet) {
      throw new CustomError("No tweet found!", 404);
    }
    res.status(200).json(foundTweet);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const tweets = await db.getTweets();
    const foundTweet = tweets.find((tweet) => tweet.id === parseInt(id));
    if (!foundTweet) {
      throw new CustomError("No tweet found!", 404);
    } else {
      await db.deleteTweet(id);
      res.status(200).json({ message: "Deleted successfully!" });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { getTweets, createTweet, getById, deleteTweet };
