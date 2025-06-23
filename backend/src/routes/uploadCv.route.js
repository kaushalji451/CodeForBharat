const express = require("express");
const uploadCvRoute = express.Router();
const { google } = require("googleapis");
const multer = require("multer");
const { Readable } = require("stream");
const { CandidateModel } = require("../models/candidates");

// Multer setup for file parsing
const storage = multer.memoryStorage(); // store file in memory
const upload = multer({ storage: storage });

// Upload route with multer middleware
uploadCvRoute.post("/upload", upload.single("cvUrl"), async (req, res) => {
  try {
    const { username } = req.body;
    console.log("Received username:", username);
    console.log("Received file:", req.file);
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    // Google Drive Auth
    const keyFile = JSON.parse(
      Buffer.from(process.env.GOOGLE_DRIVE_SERVICE_KEY, "base64").toString()
    );
    const auth = new google.auth.GoogleAuth({
      credentials: keyFile,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });
    const drive = google.drive({ version: "v3", auth });

    // Create a readable stream from buffer
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);

    // Upload to Google Drive
    const driveResponse = await drive.files.create({
      requestBody: {
        name: `${username}_Resume.pdf`,
        mimeType: file.mimetype,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: file.mimetype,
        body: bufferStream,
      },
      fields: "id",
    });

    const fileId = driveResponse.data.id;
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

    console.log("File uploaded to Google Drive:", previewUrl);

    const updatedUser = await CandidateModel.findOneAndUpdate(
      { username: username },
      { cvUrl: previewUrl },
      { new: true }
    );
    console.log("Updated user with new CV URL:", updatedUser);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "CV URL updated successfully", data: updatedUser });
    }

    return res.status(200).json({ previewUrl, fileId });
  } catch (err) {
    console.error("Error uploading file:", err);
    return res.status(500).json({ error: "Failed to upload resume" });
  }
});

uploadCvRoute.get("/search", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: "Name query parameter is required" });
  }

  try {
    const regex = new RegExp(name, "i"); // Case-insensitive search
    const candidates = await CandidateModel.find({
      username: { $regex: regex },
    }).select("username");
    console.log("Search results:", candidates);
    res.status(200).json({ data: candidates });
  } catch (error) {
    console.error("Error searching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

uploadCvRoute.put("/:id",async(req,res)=>{
  const {id} = req.params;
  console.log("Received ID:", id);
  let form = req.body;
  try {
    
  let data = await CandidateModel.findByIdAndUpdate(id,form,{new:true});
  if(!data){
    return res.status(404).json({message:"Candidate not found"});
  }
  return res.status(200).json({message:"Candidate details updated successfully",data});
  } catch (error) {
    console.error("Error updating candidate details:", error);
    return res.status(500).json({message:"Failed to update candidate details"});
  }
})
module.exports = uploadCvRoute;
