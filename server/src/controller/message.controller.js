const { errorHandler } = require("../error");
const db = require("../queries");

const getMessages = async (req, res) => {
  try {
    const { userId: sender_id } = req;
    const { recipient_id } = req.params;

    const messages = await db.getMessages(sender_id, recipient_id);
    res.status(200).json(messages);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { getMessages };
