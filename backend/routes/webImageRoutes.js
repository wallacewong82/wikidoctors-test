import express from "express";
import { getWebImageById } from "../controllers/webImageController.js";
const router = express.Router();

router.route("/:id").get(getWebImageById);

export default router;
