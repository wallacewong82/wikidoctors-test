import fs from 'fs';
import path from 'path';
import axios from 'axios';
import xlsx from 'xlsx';
import Jimp from 'jimp'; // Import Jimp for image conversion
import imageType from 'image-type'; // Import image-type for MIME type detection

// Load the Excel workbook
const workbook = xlsx.readFile('/home/wallace/Desktop/specialistscraper/DoctorDatabase21Apr2024.xlsx');
const worksheet = workbook.Sheets['ExportFinal']; // Change 'Sheet1' to your sheet name

// Specify the column containing image URLs and names
const urlColumn = 'J'; // Change 'A' to the appropriate column letter
const nameColumn = 'I'; // Change 'B' to the appropriate column letter

// Specify the folder to save images
const folderPath = '/home/wallace/Desktop/specialistscraper/Images/';

// Specify the default image URL
const defaultImageUrl = '/home/wallace/Desktop/specialistscraper/doctorDefault.png';

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}


// Function to download and save image with delay
async function downloadAndSaveImage(imageUrl, imageName, imagePath) {
    try {
        const response = await axios({
            url: imageUrl,
            responseType: 'arraybuffer' // Set response type to arraybuffer to get binary data
        });
        if (response.status === 200) {
            // Determine the MIME type of the image buffer
            const buffer = Buffer.from(response.data);
            const mimeType = imageType(buffer)?.mime;

            if (mimeType === 'image/webp') {
                console.log(`Image "${imageName}" is in WebP format, converting to JPEG...`);

                // Convert WebP images to JPEG format before processing with Jimp
                const tempImagePath = path.join(folderPath, `${imageName}.temp`); // Temporary path for WebP image
                fs.writeFileSync(tempImagePath, buffer); // Write WebP image to a temporary file

                // Load the image using Jimp
                const jimpImage = await Jimp.read(tempImagePath);

                // Write the image to the final destination in JPEG format
                await jimpImage.writeAsync(imagePath);

                // Delete the temporary file
                fs.unlinkSync(tempImagePath);

                console.log(`Image "${imageName}" saved successfully.`);
            } else {
                // For other image formats, save directly to the file system
                fs.writeFileSync(imagePath, buffer);
                console.log(`Image "${imageName}" saved successfully.`);
            }
        } else {
            throw new Error(`Failed to download image for ${imageName}`);
        }
    } catch (error) {
        console.error(`Failed to download image for ${imageName}: ${error}`);
    }
}

// Delay between requests (in milliseconds)
const delayBetweenRequests = 200; // Adjust as needed

// Iterate through rows
const range = worksheet['!ref'];
const startRow = range.split(':')[0].replace(/[^\d]/g, '');
const endRow = range.split(':')[1].replace(/[^\d]/g, '');

// Loop through rows with delay between requests
let currentRow = startRow;
function processRow() {
    if (currentRow <= endRow) {
        const imageUrl = worksheet[urlColumn + currentRow] ? worksheet[urlColumn + currentRow].v : null;
        let imageName = worksheet[nameColumn + currentRow] ? worksheet[nameColumn + currentRow].v : null;

        // Replace "/" and spaces in imageName with underscores
        imageName = imageName.replace(/\//g, '_').replace(/ /g, '_');

        if (imageUrl && imageName) {
            const imagePath = path.join(folderPath, `${imageName}.jpg`);
            downloadAndSaveImage(imageUrl, imageName, imagePath).then(() => {
                currentRow++;
                setTimeout(processRow, delayBetweenRequests);
            });
        } else {
            currentRow++;
            setTimeout(processRow, delayBetweenRequests);
        }
    }
}
// // Function to download and save image with delay
// async function downloadAndSaveImage(imageUrl, imageName, imagePath) {
//     try {
//         const response = await axios({
//             url: imageUrl,
//             responseType: 'stream'
//         });
//         if (response.status === 200) {
//             response.data.pipe(fs.createWriteStream(imagePath));
//         } else {
//             throw new Error(`Failed to download image for ${imageName}`);
//         }
//     } catch (error) {
//         console.error(`Failed to download image for ${imageName}: ${error}`);
//         saveDefaultImage(imagePath);
//     }
// }

// // Function to save the default image
// function saveDefaultImage(imagePath, imageName) {
//     axios({
//         url: defaultImageUrl,
//         responseType: 'stream'
//     }).then(defaultResponse => {
//         defaultResponse.data.pipe(fs.createWriteStream(imagePath));
//     }).catch(error => {
//         console.error(`Failed to download default image for ${imageName}: ${error}`);
//     });
// }

// // Delay between requests (in milliseconds)
// const delayBetweenRequests = 200; // Adjust as needed

// // Loop through rows with delay between requests
// let currentRow = startRow;
// function processRow() {
//     if (currentRow <= endRow) {
//         const imageUrl = worksheet[urlColumn + currentRow] ? worksheet[urlColumn + currentRow].v : null;
//         let imageName = worksheet[nameColumn + currentRow] ? worksheet[nameColumn + currentRow].v : null;

//         // Handle imageName containing "/"
//         imageName = imageName.replace(/\//g, '_').replace(/ /g, '_');
//         console.log(imageName);
//         if (imageUrl && imageName) {
//             const imagePath = path.join(folderPath, `${imageName}.jpg`);
//             downloadAndSaveImage(imageUrl, imageName, imagePath).then(() => {
//                 currentRow++;
//                 setTimeout(processRow, delayBetweenRequests);
//             });
//         } else {
//             currentRow++;
//             setTimeout(processRow, delayBetweenRequests);
//         }
//     }
// }
// // Start processing rows with delay
processRow();

console.log("Done");