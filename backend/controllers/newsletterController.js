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
    host:'smtpout.secureserver.net',
    port:465,
    secure: true,
    auth: {
      user: process.env.GDADDY_ADDRESS,
      pass: process.env.GDADDY_PASSWORD,
      // user: process.env.GMAIL_ADDRESS,
      // pass: process.env.GMAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.GDADDY_ADDRESS,
  //  from: process.env.GMAIL_ADDRESS,
    to: to, // Placeholder for recipient email
    subject: "WikiDoctors Newsletter Signup",
    html: content,
    bcc: ['webmagic@gmail.com']
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
