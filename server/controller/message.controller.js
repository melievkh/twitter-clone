const { errorHandler } = require("../error");
const db = require("../queries");

const getMessages = async (req, res) => {
  try {
    const messages = await db.getMessages();
    res.status(200).json(messages);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const createMessage = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    const userId = req.userId;
    const createdMessage = await db.createMessage(userId, recipientId, message);
    res.status(201).json(createdMessage);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const foundMessages = await db.getMessagesByUserId(id);
    if (!foundMessages) {
      throw new CustomError("No messages found!", 404);
    }
    res.status(200).json(foundMessages);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { createMessage, getMessages, getByUserId };
