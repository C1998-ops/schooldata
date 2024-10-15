const express = require("express");
const {
  createScoreCard,
  getAllScores,
} = require("../Controller/ScoreCard.controller");
const router = express.Router();
router.post("/scoredetail/create", createScoreCard);
router.get("/get/AllScores", getAllScores);
module.exports = router;
