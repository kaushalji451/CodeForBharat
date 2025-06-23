const express = require("express");
const candidatesRoute = express.Router();
const connectDb = require("../initdb/connectDb");
const { CandidateModel } = require("../models/candidates");
const {UserModel} = require("../models/userModel");
const dotenv = require("dotenv");
connectDb();

candidatesRoute.get("/alluser", async (req, res) => {
  try {
    let data = await CandidateModel.find({});
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
candidatesRoute.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10, position, appliedOn, score } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // Validate pagination inputs
    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json({ message: "Invalid page or limit" });
    }

    const skip = (page - 1) * limit;

    // Default score range
    let min = 0;
    let max = 100;

    // Validate and extract score range
    if (score && /^\d+(\.\d+)?-\d+(\.\d+)?$/.test(score)) {
      const [minStr, maxStr] = score.split("-");
      min = parseFloat(minStr);
      max = parseFloat(maxStr);
    }

    // Build match stage
    const matchStage = {
      "scoreDetails.percentage": { $gte: min, $lte: max },
    };

    if (position) {
      matchStage.position = position;
    }

    if (appliedOn) {
      const start = new Date(appliedOn);
      start.setHours(0, 0, 0, 0);
      const end = new Date(appliedOn);
      end.setHours(23, 59, 59, 999);
      matchStage.appliedOn = { $gte: start, $lte: end };
    }

    // Common stages
    const lookupAndUnwind = [
      {
        $lookup: {
          from: "scores",
          localField: "score",
          foreignField: "_id",
          as: "scoreDetails",
        },
      },
      { $unwind: "$scoreDetails" },
    ];

    // Parallel aggregation: paginated data and total count
    const [data, total] = await Promise.all([
      CandidateModel.aggregate([
        ...lookupAndUnwind,
        { $match: matchStage },
        { $sort: { appliedOn: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]),
      CandidateModel.aggregate([
        ...lookupAndUnwind,
        { $match: matchStage },
        { $count: "total" },
      ]),
    ]);

    const totalCount = total[0]?.total || 0;

    res.status(200).json({
      total: totalCount,
      page,
      pages: Math.ceil(totalCount / limit),
      data,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



candidatesRoute.get("/status/:status", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const filters = { status: req.params.status };

    const [data, total] = await Promise.all([
      CandidateModel.find(filters)
        .sort({ appliedOn: -1 })
        .skip(skip)
        .limit(limit)
        .populate("score"),
      CandidateModel.countDocuments(filters),
    ]);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    console.error("Error fetching candidates by status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

candidatesRoute.get("/status-counts", async (req, res) => {
  try {
    const result = await CandidateModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const counts = result.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch status counts" });
  }
});

candidatesRoute.get("/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let data = await CandidateModel.findById(id).populate("score");
    if (data != null) {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "No user found" });
  }
});

candidatesRoute.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { status, tag, name, email } = req.body;
  try {
    let data = await CandidateModel.findByIdAndUpdate(id, {
      name,
      email,
      tag,
      status,
    });
    if (data != null) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await CandidateModel.findByIdAndDelete(id);
    let res = await UserModel.findOneAndDelete({email : data.email});
    console.log(res);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.patch("/bulk-update", async (req, res) => {
  const { ids, status } = req.body;
  try {
    const result = await CandidateModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status: status } }
    );
    res.status(200).json({ message: "Bulk update successful", result });
  } catch (error) {
    console.error("Error in bulk update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = candidatesRoute;
module.exports = candidatesRoute;
