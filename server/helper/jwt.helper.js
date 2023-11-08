const JWT = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const secret_key = process.env.ACCESS_TOKEN_KEY;
      let payload = { userId };

      const options = {
        expiresIn: "1h",
      };

      JWT.sign(payload, secret_key, options, (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      });
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const secret_key = process.env.REFRESH_TOKEN_KEY;
      let payload = { userId };

      const options = {
        expiresIn: "1y",
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
