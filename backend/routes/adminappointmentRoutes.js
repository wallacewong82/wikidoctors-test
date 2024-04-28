import express from "express";
const router = express.Router();
import {
  getAppointments,
  getAppointmentsByIndividualID,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/appointmentlist").get(protect, admin, getAppointments);
router
  .route("/appointmentlist/:id")
  .get(protect, admin, getAppointmentsByIndividualID)
  .put(protect, admin, updateAppointment)
  .delete(protect, admin, deleteAppointment);

export default router;
