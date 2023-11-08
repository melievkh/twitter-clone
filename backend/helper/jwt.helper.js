const JWT = require("jsonwebtoken");
require("dotenv").config();

const { CustomError } = require("../error");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      const secret_key = process.env.ACCESS_TOKEN_KEY;
      const options = {
        expiresIn: "1h",
        audience: userId,
      };

      JWT.sign(payload, secret_key, options, (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new CustomError("Unauthorized", 401);

    const bareerToken = authHeader.split(" ");
    const token = bareerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
      if (err) {
        const errMessage =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        throw new CustomError(
          errMessage,
          errMessage === "Unauthorized" ? 401 : 500
        );
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      const secret_key = process.env.REFRESH_TOKEN_KEY;
      const options = {
        expiresIn: "1y",
        audience: userId,
      };

      JWT.sign(payload, secret_key, options, (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      });
    });
  },

  verifyRefreshToken: (req, res, next) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        (err, payload) => {
          if (err) {
            next(err);
          }
          resolve(userId);
        }
      );
    });
  },
};
