const { errorHandler } = require("../error");
const db = require("../queries");

const getFollowers = async (req, res) => {
  try {
    const { userId } = req;
    const messages = await db.getMessages(userId);
    res.status(200).json(messages);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const createFollowRequest = async (req, res) => {
  try {
    const { userId } = req;
    const { following_id } = req.body;
    const message = await db.createFollowRequest(userId, following_id);
    console.log(message);
    res.status(200).json({ message, message: "success!" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { getFollowers, createFollowRequest };
