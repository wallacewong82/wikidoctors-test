import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blogModel.js";

// @desc Fetch as blogs
// @route GET /api/blog
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// @desc Fetch as single blog
// @route GET /api/blog/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blogItem = await Blog.findById(req.params.id);
  if (blogItem) {
    return res.json(blogItem);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc create blogpost
// @route POST /api/blog
// @access Private/Admin
const createBlogAsAdmin = asyncHandler(async (req, res) => {
  const blog = new Blog({
    authorname: "Sample name",
    authorimage: "",
    authorwriteup: "Sample writeup",
    blogimage: "",
    title: "Sample post",
    category: "Specialists",
    content: "Sample content",
    contentduration: "5 min",
    posteddate: "",
  });
  const createdBlog = await blog.save();
  if (createdBlog) {
    res.status(201).json(createdBlog);
    console.log("created");
  } else {
    res.status(404);
    throw new Error("Could not create");
  }
});

// @desc delete blogpost
// @route DELETE /api/blog
// @access Private/Admin
const deleteBlogAsAdmin = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    await Blog.deleteOne({ _id: blog._id });
    res.status(200).json({ message: "Blog deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc Update a blog
// @route PUT /api/blog/:id
// @access Private/Admin
const updateBlogAsAdmin = asyncHandler(async (req, res) => {
  const {
    authorName,
    authorImage,
    authorWriteup,
    blogImage,
    title,
    category,
    content,
    contentDuration,
    publishDate,
  } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.authorname = authorName;
    blog.authorimage = authorImage;
    blog.authorwriteup = authorWriteup;
    blog.blogimage = blogImage;
    blog.title = title;
    blog.category = category;
    blog.content = content;
    blog.contentduration = contentDuration;
    blog.posteddate = publishDate;
    const updatedBlog = await blog.save();
    res.status(201).json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

export {
  getBlogById,
  getBlogs,
  createBlogAsAdmin,
  deleteBlogAsAdmin,
  updateBlogAsAdmin,
};
