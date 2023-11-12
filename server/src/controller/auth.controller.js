const crypto = require("crypto");
const bcrypt = require("bcrypt");

const db = require("../queries");
const { CustomError, errorHandler } = require("../error");
const { signAccessToken, signRefreshToken } = require("../helper/jwt.helper");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await db.getUserByEmail(email);
    if (!foundUser) {
      throw new CustomError("User Not Found!", 404);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordCorrect) {
      throw new CustomError("Incorrect password!", 404);
    }
    const accessToken = await signAccessToken(foundUser.id);
    const refreshToken = await signRefreshToken(foundUser.id);
    const userId = foundUser.id;
    res.status(200).json({ accessToken, refreshToken, userId });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const register = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;
    const foundUser = await db.getUniqueUser(email, username);
    if (foundUser) {
      throw new CustomError("Try another username or email!", 400);
    }

    const userId = crypto.randomBytes(16).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.registerUser(userId, username, fullname, email, hashedPassword);
    res.status(201).json({ message: "Registered successfully!" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const refresh = async (req, res) => {
  try {
    const { userId } = req;
    const accessToken = await signAccessToken(userId);
    const refreshToken = await signRefreshToken(userId);

    res.status(200).json({ accessToken, refreshToken, userId });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { login, register, refresh };
