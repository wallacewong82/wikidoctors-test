import express from "express";
const router = express.Router();
import {
  getAppointmentsByAccount,
 // getAppointmentsByAccountByID,
 updateAppointmentByAccountById
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getAppointmentsByAccount);
router.route("/:id").put(protect, updateAppointmentByAccountById);
//router.route("/:id").get(protect, getAppointmentsByAccountByID);
export default router;
