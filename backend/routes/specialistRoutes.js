import express from "express";
const router = express.Router();

import {
  getSpecialists,
  getSpecialistById,
  getSpecialistsAsAdmin,
  deleteSpecialistByAdmin,
  createSpecialistByAdmin,
  updateSpecialistByAdmin,
  getSpecialistByIdAsAdmin
} from "../controllers/specialistController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getSpecialists);

// router.route('/mult').get(getSpecialistsMult);

router.route("/profile/:id").get(getSpecialistById);
router.route("/specialistlist").get(protect, admin, getSpecialistsAsAdmin).post(protect, admin, createSpecialistByAdmin);
router
  .route("/specialistlist/:id")
  .get(protect,admin, getSpecialistByIdAsAdmin)
  .delete(protect, admin, deleteSpecialistByAdmin)
  .put(protect, admin, updateSpecialistByAdmin);
export default router;
