// import fs from 'fs';
// import path from 'path';
// import mongoose from 'mongoose';

// // console.log("1")
// // dotenv.config();
// // console.log("2")
// // connectDB();
// // console.log("3");
// // // Connect to MongoDB (replace 'mongodb://localhost:27017/my_database' with your MongoDB connection string)
// // console.log(process.env.MONGO_URI)
// // 
// // console.log("4");
// // Define a schema for the images collection

// console.log("1")
// console.log("MONGO_URI:", 'mongodb+srv://wallacewong82:wallacewong82@cluster0.m2uvnl8.mongodb.net/dhj?retryWrites=true&w=majority'); // Check if MONGO_URI is properly set
// // if (!process.env.MONGO_URI) {
// //     console.error("MONGO_URI is not defined.");
// //     process.exit(1);
// // }
// mongoose.connect('mongodb+srv://wallacewong82:wallacewong82@cluster0.m2uvnl8.mongodb.net/dhj?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// console.log("2");

// const imageSchema = new mongoose.Schema({
//     name: String,
//     filePath: String // Use filePath to store the path of the image in Ubuntu folder
// });

// // Create a model based on the schema
// const Image = mongoose.model('Image', imageSchema);

// // Function to upload images to MongoDB
// async function uploadImagesToMongoDB(folderPath, mongoPath) {
//     try {
//         // Read all files in the folder
//         const files = fs.readdirSync(folderPath);

//         // Iterate through files
//         for (const file of files) {
//             const imagePath = path.join(mongoPath, file);

//             // Create a new Image document
//             const image = new Image({
//                 name: file, // Use the filename as the name
//                 filePath: imagePath // Use the absolute file path of the image
//             });

//             // Save the image document to MongoDB
//             await image.save();

//             console.log(`Image "${file}" uploaded to MongoDB with filePath: ${image.filePath}`);
//         }

//         console.log('All images uploaded successfully.');
//         process.exit(0);
//     } catch (error) {
//         console.error('Failed to upload images to MongoDB:', error);
//         process.exit(1);
//     }
// }

// // Specify the folder containing images
// const folderPath = '/home/wallace/Desktop/specialistscraper/Images/';
// const mongoPath = `/docImages/`
// console.log("3");

// // Call the function to upload images to MongoDB
// uploadImagesToMongoDB(folderPath, mongoPath);
// console.log("done");