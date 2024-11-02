import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import fs from 'fs';
import xlsx from 'xlsx';

// Connect to MongoDB
const connection = mongoose.createConnection(
  "mongodb+srv://wallacewong82:wallacewong82@cluster0.m2uvnl8.mongodb.net/wikidocs-test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

connection.on("error", (err) =>
  console.error("MongoDB connection error:", err)
);

connection.once("open", async () => {
  console.log("MongoDB connected successfully.");

  // Create a GridFSBucket instance after the connection is open
  const bucket = new GridFSBucket(connection.db, {
    bucketName: "Images",
  });

  try {
    // Retrieve all file documents from the Images.files collection
    const fileDocuments = await connection.db.collection('Images.files').find({}).toArray();

    // Extract file IDs and names from the file documents
    const imageFiles = fileDocuments.map(doc => ({
      fileId: doc._id.toString(),
      filename: doc.filename
    }));

    // Create a new workbook
    const workbook = xlsx.utils.book_new();

    // Convert the imageFiles array to a worksheet
    const worksheet = xlsx.utils.json_to_sheet(imageFiles);

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Image Files');

    // Write the workbook to a file
    const outputPath = 'image_files.xlsx';
    xlsx.writeFile(workbook, outputPath);

    console.log(`Image files saved to ${outputPath}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    connection.close();
  }
});