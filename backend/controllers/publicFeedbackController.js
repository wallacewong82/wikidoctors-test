import asyncHandler from "../middleware/asyncHandler.js";
import PublicFeedback from "../models/publicFeedbackModel.js";
import nodemailer from "nodemailer";

// @desc create new public feedback
// @route POST /api/pfeedback
// @access Public
const createPublicFeedback = asyncHandler(async (req, res) => {
  const { userName, emailAddress, phoneNumber, subject, message } = req.body;
  const pfeedback = new PublicFeedback({
    userName,
    emailAddress,
    phoneNumber,
    subject,
    message,
  });
  try {
    const createdFeedback = await pfeedback.save();
    const recipientemail = pfeedback.emailAddress;
    const thankyoufeedback =
      "We received your feedback received on " +
      pfeedback.createdAt +
      ".\n\nYour feedback is provided as:\n" +
      "Name: " +
      pfeedback.userName +
      "\nEmail: " +
      pfeedback.emailAddress +
      "\nPhone: " +
      pfeedback.phoneNumber +
      "\nSubject: " +
      pfeedback.subject +
      "\nMessage: " +
      pfeedback.message +
      "\n\nPlease allow us 3 working days to respond to you. We deeply appreciate your patience with us, and your continued support. \n\nSincerely,\nWallace\nThe HealthChannel.sg team";
    sendEmail({ to: recipientemail, content: thankyoufeedback });
    res.status(201).json(createdFeedback);
    console.log("created");
  } catch (err) {
    res.status(500).json({ message: "Error creating feedback", error: err });
  }
});

function sendEmail({ to, content }) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Gmail SMTP port
    secure: false,
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: to, // Placeholder for recipient email
    subject: "Thank you for your feedback",
    text: content,
  };

  // Send email
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}
export { createPublicFeedback };
