const router = require("express").Router();

const {
  getFollowers,
  createFollowRequest,
} = require("../controller/follow.controller");

router.get("/followers", getFollowers);
router.post("/create", createFollowRequest);

module.exports = router;
