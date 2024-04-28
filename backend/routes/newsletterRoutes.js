import express from "express";
const router = express.Router();
import { createNewsletterSignup } from "../controllers/newsletterController.js";

router.route('/').post(createNewsletterSignup);

export default router;
