const router = require("express").Router();

const { login, register, refresh } = require("../controller/auth.controller");
const { verifyRefreshToken } = require("../helper/jwt.helper");
const validator = require("../middleware/validation.middleware");
const { loginSchema, registerSchema } = require("../schema/auth.schema");

router.post("/login", loginSchema, validator, login);
router.post("/register", registerSchema, validator, register);
router.post("/refresh", verifyRefreshToken, refresh);

module.exports = router;
