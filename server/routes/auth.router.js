const express = require("express");
const {
  createAccount,
  signInAccount,
  verifyAccount,
} = require("../Controller/Auth.controller");
const router = express.Router();
router.post("/account/signup", createAccount);
router.post("/account/signin", signInAccount);
router.get("/account/verification/:token",verifyAccount)
module.exports = router;
