import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsersAsAdmin,
  updateUserProfileAsAdmin,
  deleteUserAsAdmin,
  getUserAsAdmin,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsersAsAdmin);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUserAsAdmin)
  .get(protect, admin, getUserAsAdmin)
  .put(protect, admin, updateUserProfileAsAdmin);

export default router;
