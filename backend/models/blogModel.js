import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    authorname: {
      type: String,
      required: true,
    },
    authorimage: {
      type: String,
      required: false,
    },
    authorwriteup: {
      type: String,
      required: true,
    },
    blogimage: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentduration: {
      type: String,
      required: true,
    },
    posteddate: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
