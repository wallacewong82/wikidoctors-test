import asyncHandler from "../middleware/asyncHandler.js";
import NewsLetter from "../models/newsletterModel.js";
import nodemailer from "nodemailer";
import { readFileSync } from 'fs';
// @desc create new signup for newsletter
// @route POST /api/newsletter
// @access Public
const createNewsletterSignup = asyncHandler(async (req, res) => {
  const { emailAddress } = req.body;
  const newsletter = new NewsLetter({
    emailAddress: emailAddress,
  });
  const createdNewsletter = await newsletter.save();
  const htmlTemplate = readFileSync('backend/newslettertemplate.html', 'utf8');
  sendEmail({ to: emailAddress, content: htmlTemplate });
  res.status(201).json(createdNewsletter);

  console.log("created");
});

function sendEmail({to, content}) {
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
    subject: "HealthChannel Newsletter Signup",
    html: content,
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
export { createNewsletterSignup };
