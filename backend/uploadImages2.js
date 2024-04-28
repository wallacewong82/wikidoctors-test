import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import fs from "fs";
import path from "path";

// Connect to MongoDB
const connection = mongoose.createConnection(
  "mongodb+srv://wallacewong82:wallacewong82@cluster0.m2uvnl8.mongodb.net/dhj?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
connection.on("error", (err) =>
  console.error("MongoDB connection error:", err)
);

connection.once("open", () => {
  console.log("MongoDB connected successfully.");

  // Create a GridFSBucket instance after the connection is open
  const bucket = new GridFSBucket(connection.db, {
    bucketName: "Images",
  });

  // Create a schema for your data
  const dataSchema = new mongoose.Schema({
    name: String,
    imageFileId: mongoose.Types.ObjectId, // Store the ID of the image file in MongoDB
  });

  // Create a model for your data
  const Data = connection.model("Data", dataSchema);

  // Function to upload images to MongoDB using GridFS
  const uploadImagesToMongoDB = async (imageFolder) => {
    // Read all files from the specified folder
    const imageFiles = fs.readdirSync(imageFolder);

    for (const filename of imageFiles) {
      const imagePath = path.join(imageFolder, filename);
      console.log(imagePath);
      const fileStream = fs.createReadStream(imagePath);

      const uploadStream = bucket.openUploadStream(filename);
      fileStream.pipe(uploadStream);

      const data = new Data({
        name: filename,
        imageFileId: uploadStream.id, // Store the ID of the uploaded image file
      });

      await data.save();
    }
    console.log("done");
    process.exit(0);
  };

  // Usage example
  const imageFolder = "/home/wallace/Desktop/specialistscraper/Images/";
  uploadImagesToMongoDB(imageFolder)
    .then(() => {
      console.log("Images uploaded successfully.");
    })
    .catch((err) => console.error("Error:", err));
});
