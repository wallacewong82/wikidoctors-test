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
    bucketName: "FrontendImages",
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
    try {
      // Read all files from the specified folder
      const imageFiles = fs.readdirSync(imageFolder);
  
      for (const filename of imageFiles) {
        const imagePath = path.join(imageFolder, filename);
        console.log("Uploading file:", filename);
        const fileStream = fs.createReadStream(imagePath);
  
        fileStream.on("error", (err) => {
          console.error(`Error reading file ${filename}:`, err);
        });
  
        const uploadStream = bucket.openUploadStream(filename);
        uploadStream.on("error", (err) => {
          console.error(`Error uploading file ${filename}:`, err);
        });
  
        fileStream.pipe(uploadStream);
  
        const data = new Data({
          name: filename,
          imageFileId: uploadStream.id, // Store the ID of the uploaded image file
        });
  
        const saveResult = await data.save();
        console.log("Save result:", saveResult);
  
        // Retry mechanism to check for metadata document existence
        let retryCount = 0;
        const maxRetries = 10; // Maximum number of retries
        const retryInterval = 3000; // Retry interval in milliseconds (2 seconds)
        let metadataFound = false;
  
        while (!metadataFound && retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryInterval));
  
          const fileId = uploadStream.id;
          const fileExists = await bucket.find({ _id: fileId }).toArray();
          if (fileExists && fileExists.length > 0) {
            console.log(`Metadata document found for file: ${filename}`);
            metadataFound = true;
          } else {
            console.log(`Retry ${retryCount + 1}: Metadata document not found for file: ${filename}`);
            retryCount++;
          }
        }
  
        if (!metadataFound) {
          throw new Error(`Metadata document not found for file: ${filename}`);
        }
      }
      console.log("Upload process completed.");
    } catch (err) {
      console.error("Error:", err);
      process.exit(1);
    }
    process.exit(0);
  };
  
  
  
//   const uploadImagesToMongoDB = async (imageFolder) => {
//     try {
//       // Read all files from the specified folder
//       const imageFiles = fs.readdirSync(imageFolder);
  
//       for (const filename of imageFiles) {
//         const imagePath = path.join(imageFolder, filename);
//         console.log("Uploading file:", filename);
//         const fileStream = fs.createReadStream(imagePath);
  
//         fileStream.on("error", (err) => {
//           console.error(`Error reading file ${filename}:`, err);
//         });
  
//         const uploadStream = bucket.openUploadStream(filename);
//         uploadStream.on("error", (err) => {
//           console.error(`Error uploading file ${filename}:`, err);
//         });
  
//         fileStream.pipe(uploadStream);
  
//         const data = new Data({
//           name: filename,
//           imageFileId: uploadStream.id, // Store the ID of the uploaded image file
//         });
  
//         await data.save();
  
//         // Introduce a delay to ensure the metadata document is created
//         await new Promise(resolve => setTimeout(resolve, 1000));
  
//         // Check if the metadata document exists
//         const fileId = uploadStream.id;
//         const fileExists = await bucket.find({ _id: fileId }).toArray();
//         if (!fileExists || fileExists.length === 0) {
//             console.log(`Metadata document not found for file: ${filename}`);
//             //throw new Error(`Metadata document not found for file: ${filename}`);
//         } else {
//           console.log(`Metadata document found for file: ${filename}`);
//         }
//       }
//       console.log("Upload process completed.");
//     } catch (err) {
//       console.error("Error:", err);
//       process.exit(1);
//     }
//     process.exit(0);
//   };
  
//   // Function to upload images to MongoDB using GridFS
//   const uploadImagesToMongoDB = async (imageFolder) => {
//     try {
//       // Read all files from the specified folder
//       const imageFiles = fs.readdirSync(imageFolder);

//       for (const filename of imageFiles) {
//         const imagePath = path.join(imageFolder, filename);
//         console.log("Uploading file:", filename);
//         const fileStream = fs.createReadStream(imagePath);

//         fileStream.on("error", (err) => {
//           console.error(`Error reading file ${filename}:`, err);
//         });

//         const uploadStream = bucket.openUploadStream(filename);
//         uploadStream.on("error", (err) => {
//           console.error(`Error uploading file ${filename}:`, err);
//         });

//         fileStream.pipe(uploadStream);

//         const data = new Data({
//           name: filename,
//           imageFileId: uploadStream.id, // Store the ID of the uploaded image file
//         });

//         await data.save();

//         // Ensure that the metadata document is created and saved
//         const fileId = uploadStream.id;
//         const fileExists = await bucket.find({ _id: fileId }).toArray();
//         if (!fileExists || fileExists.length === 0) {
//             console.log(`Metadata document not found for file: ${filename}`);
//          // throw new Error(`Metadata document not found for file: ${filename}`);
//         } else {
//           console.log(`Metadata document found for file: ${filename}`);
//         }
//       }
//       console.log("Upload process completed.");
//     } catch (err) {
//       console.error("Error:", err);
//       process.exit(1);
//     }
//     process.exit(0);
//   };

  // Usage example
  const imageFolder = "/home/wallace/Desktop/DigitalHealthScreening4Launch/frontend/public/images/";
  uploadImagesToMongoDB(imageFolder)
    .then(() => {
      console.log("Images uploaded successfully.");
    })
    .catch((err) => console.error("Error:", err));
});