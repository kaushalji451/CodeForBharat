const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  phoneno: {
    type: Number,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  address: {
    type: String,
  },
  degree: {
    type: String,
  },
  SOP: {
    type: String,
  },
  status: {
    type: String,
    enum: ['in-review', 'accepted', 'Selected', 'rejected'],
    default: 'accepted',
    required: true
  },
  appliedOn: {
    type: Date,
  },
  tag: {
    type: String,
  },
  cvUrl: {
    type: String,
  },
  position: {
    type: String,
    ref: "Position",
  },
  score: {
    type: Schema.Types.ObjectId,
    ref: "Score",
  },
});

const CandidateModel = mongoose.model("Candidate", candidateSchema);

module.exports = {
  CandidateModel
};