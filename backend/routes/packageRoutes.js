import express from "express";
const router = express.Router();
import { getPackageById, getPackages } from "../controllers/packageController.js";


router.route('/').get(getPackages);

router.route('/:id').get(getPackageById);

export default router;
