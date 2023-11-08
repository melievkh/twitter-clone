const { body } = require("express-validator");

module.exports.tweetSchema = [
  body("caption").exists().withMessage("field is required!"),
];
