const jwt = require("jsonwebtoken");
require("dotenv").config();

const { errorHandler, CustomError } = require("../error");

module.exports.verifyAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new CustomError("Unauthorized", 401);

    const bareerToken = authHeader.split(" ");
    const token = bareerToken[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
      if (err) {
        const errMessage =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        throw new CustomError(
          errMessage,
          errMessage === "Unauthorized" ? 401 : 500
        );
      }

      req.userId = payload.userId;
      next();
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
