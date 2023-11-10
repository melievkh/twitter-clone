const { body } = require("express-validator");

// register schema

module.exports.registerSchema = [
  body("fullname")
    .exists()
    .isLength({ min: 4 })
    .withMessage("minimum character for fullname is 4!"),
  body("username")
    .exists()
    .withMessage("username is required!")
    .isLength({ min: 4 })
    .withMessage("minimum character for username is 4!"),
  body("email").exists().isEmail().withMessage("enter valid email!"),
  body("password")
    .exists()
    .withMessage("password is required!")
    .isLength({ min: 4 })
    .withMessage("minimum character for password is 4!"),
];

// login schema

module.exports.loginSchema = [
  body("email").exists().isEmail().withMessage("enter valid email!"),
  body("password")
    .exists()
    .withMessage("password is required!")
    .isLength({ min: 4 })
    .withMessage("minimum character for password is 4!"),
];
