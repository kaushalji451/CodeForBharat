const express = require("express");
const Question = require("../models/questions");
const { CandidateModel } = require("../models/candidates");
const main = require("../initdb/connectDb");

main()

const questionsRoute = express.Router();

questionsRoute.get("/", async (req, res) => {
  let { userId } = req.query;
  console.log("got it ", userId);
  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }
  try {
    let user = await CandidateModel.findById(userId);
    let questions = await Question.find({
      questiontype: { $in: user.position }
    });
    res.status(200).json({ message: "success", questions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
})


module.exports = questionsRoute;