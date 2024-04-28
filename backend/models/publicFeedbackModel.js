import mongoose from "mongoose";

const publicFeedbackSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const PublicFeedback = mongoose.model("PublicFeedback", publicFeedbackSchema);

export default PublicFeedback;
