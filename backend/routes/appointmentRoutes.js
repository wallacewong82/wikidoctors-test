import express from "express";
const router = express.Router();
import {
  newAppointment,
  getAppointmentsByClinicId
} from "../controllers/appointmentController.js";
 
router.route("/").post(newAppointment)
router.route("/:id").get(getAppointmentsByClinicId);


export default router;
