import express from "express";
const router = express.Router();
import { createPublicFeedback } from "../controllers/publicFeedbackController.js";

router.route('/').post(createPublicFeedback);

export default router;
