const express = require("express");
const { CandidateModel } = require("../models/candidates");
const Score = require("../models/Score");

const main = require("../initdb/connectDb");

main()

const scoreRoute = express.Router();

scoreRoute.post("/", async (req, res) => {
  let { userId } = req.query;
  let { correctAnswer, timeLeft, totalQuestion, percentage,selectedAnswers } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }
  if (!correctAnswer || !timeLeft || !totalQuestion || !percentage) {
    return res.status(400).json({ message: "No data provided" });
  }
  try {
    let score = new Score({
      correctAnswer,
      timeLeft,
      totalQuestion,
      percentage,
      selectedAnswers
    });
    let scoreData = await score.save();
    let user = await CandidateModel.findById(userId);
    user.score = scoreData._id;
    await user.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = scoreRoute;