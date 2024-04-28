import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
    {
      emailAddress: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
const NewsLetter = mongoose.model("NewsLetter", newsletterSchema);

export default NewsLetter;

