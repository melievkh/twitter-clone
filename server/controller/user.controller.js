const { errorHandler } = require("../error");
const db = require("../queries");

const getUsers = async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).send(users);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
module.exports = { getUsers, getUserById };
