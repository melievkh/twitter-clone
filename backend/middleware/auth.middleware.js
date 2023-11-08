const jwt = require("jsonwebtoken");
require("dotenv").config();

const { errorHandler } = require("../error");

module.exports.authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const secret_key = process.env.ACCESS_TOKEN_KEY;
    const { aud } = jwt.verify(token, secret_key);
    req.userId = aud;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      let jwtError = {
        message: "Unauthorized!",
        statusCode: 401,
      };
      errorHandler(jwtError, req, res);
    }
    errorHandler({ message: "You should login again!", status: 401 }, req, res);
  }
};
