import express from "express";
const router = express.Router();
import { getMaps } from "../controllers/mapController.js";


router.route('/').get(getMaps);

export default router;
