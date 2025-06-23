const express = require("express");
const {CandidateModel} = require("../models/candidates");
const sendEmailHr = require("../utils/sendEmail1");
const sendEmailCandidate = require("../utils/sendEmail2");
const main = require("../initdb/connectDb");

main()

const sendemailRoute = express.Router();

sendemailRoute.get("/", async (req, res) => {
  let { userId } = req.query;
  console.log("Received userId: this is sendemail2", userId);
  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }
  try {
    let user = await CandidateModel.findById(userId).populate("score");
    sendEmailCandidate(user);
    sendEmailHr(user);
    console.log("Email sent to candidate and HR successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
  console.log("Email route hit");
});


module.exports = sendemailRoute;