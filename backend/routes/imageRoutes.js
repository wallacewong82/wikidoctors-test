import express from "express";
//import mongoose from "mongoose";
import { getImageById } from "../controllers/imageController.js";
//import { GridFSBucket } from "mongodb";
const router = express.Router();
// const db = mongoose.connection;
// let bucket;

// db.once("open", () => {
//   bucket = new GridFSBucket(db.db, {
//     bucketName: "Images",
//   });
// });
router.route("/:id").get(getImageById);

// router.route('/mult').get(getSpecialistsMult);

// router.route("/profile/:id").get(getSpecialistById);
// import { GridFSBucket } from "mongodb";
// import path from "path";
// import { fileURLToPath } from "url"; // Import fileURLToPath from the 'url' module
// const __filename = fileURLToPath(import.meta.url); // Get the current module's filename

// const router = express.Router();

// // router.route("/:id").get(getImageById);
// router.get("/:id", async (req, res) => {
//   try {
//     console.log(req);
//     // Pass req and res to the getImageById controller function
//     getImageById(req, res);
//   } catch (error) {
//     //console.error("Error fetching image:", error);
//     //res.status(500).json({ error: "Internal server error" });
//   }
// });


export default router;
