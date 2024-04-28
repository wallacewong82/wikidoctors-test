import express from "express";
const router = express.Router();
import {
  createBlogAsAdmin,
  updateBlogAsAdmin,
  deleteBlogAsAdmin,
  getBlogById,
  getBlogs,
} from "../controllers/blogController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getBlogs).post(protect, admin, createBlogAsAdmin);
router
  .route("/:id")
  .get(getBlogById)
  .put(protect, admin, updateBlogAsAdmin)
  .delete(protect, admin, deleteBlogAsAdmin);

export default router;
