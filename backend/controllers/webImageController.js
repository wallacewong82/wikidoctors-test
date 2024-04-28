// imageController.js
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import asyncHandler from "../middleware/asyncHandler.js";

const db = mongoose.connection;
let bucket;

db.once("open", () => {
  bucket = new GridFSBucket(db.db, {
    bucketName: "FrontendImages",
  });
});
const getWebImageById = asyncHandler(async (req, res) => {
  const fileId = new mongoose.Types.ObjectId(req.params.id);

  // Find the image data in GridFS using the provided fileId
  const downloadStream = bucket.openDownloadStream(fileId);

  downloadStream.on("error", (error) => {
    res.status(404).json({ error: "Image not found" });
  });

  downloadStream.pipe(res);
});


export { getWebImageById };
