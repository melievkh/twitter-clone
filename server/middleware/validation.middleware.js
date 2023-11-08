const { validationResult } = require("express-validator");
const { CustomError, errorHandler } = require("../error");

const validator = (req, res, next) => {
  try {
    const result = validationResult(req).array();
    if (result.length) {
      throw new CustomError(result[0].msg, 404);
    }
    next();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = validator;
