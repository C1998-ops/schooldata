const asyncHandler = require("express-async-handler");
const ScoreCardModel = require("../Models/scoreCard.model");
const scoreCardModel = require("../Models/scoreCard.model");
exports.createScoreCard = asyncHandler(async (req, res) => {
  try {
    const { scoreCardTitle, scoreCardIsActive, scoreItems } = req.body;
    if (!scoreCardTitle) {
      return res.status(400).json({ error: "required fields are missing" });
    }
    // Create a new score card instance
    const newScoreCard = new ScoreCardModel({
      scoreCardTitle,
      scoreCardIsActive,
      scoreItems,
    });
    await newScoreCard.save();
    // Return a success response with the saved score card
    return res
      .status(201)
      .json({ message: "score detail created", success: true });
  } catch (error) {
    console.error("Failed to create a score card", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
exports.getAllScores = asyncHandler(async (req, res) => {
  try {
    const result = await ScoreCardModel.find();
    const transformData = result.map((data) => ({
      "sl.no": data._id,
      "ScoreCard Title": data.scoreCardTitle,
      "ScoreCard Active": data.scoreCardIsActive,
    }));
    res.json(transformData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get a specific score card by ID
exports.getScoreCardById = asyncHandler(async (req, res) => {
  try {
    const scoreCard = await scoreCardModel.findById(req.params.id);
    if (!scoreCard) {
      return res.status(404).json({ error: "Score card not found" });
    }
    res.status(200).json(scoreCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a score card
exports.updateScoreCard = asyncHandler(async (req, res) => {
  try {
    const { scoreCardTitle, scoreCardIsActive, scoreItems } = req.body;

    // Validate required fields
    if (!scoreCardTitle || !scoreCardIsActive) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedScoreCard = await scoreCardModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          scoreCardTitle,
          scoreCardIsActive,
          scoreItems,
        },
      },
      { new: true, runValidators: false }
    );

    if (!updatedScoreCard) {
      return res.status(404).json({ error: "Score card not found" });
    }

    res.json(200).json(updatedScoreCard);
  } catch (error) {
    console.error("failed updating score card", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a score card
exports.deleteScoreDetails = asyncHandler(async (req, res) => {
  try {
    const deletedScoreCard = await scoreCardModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedScoreCard) {
      return res.status(404).json({ error: "Score card not found" });
    }
    res.json({ message: "Score card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
