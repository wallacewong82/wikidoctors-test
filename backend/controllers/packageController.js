import asyncHandler from "../middleware/asyncHandler.js";
import Package from "../models/packageModel.js";

// @desc Fetch as products
// @route GET /api/package
// @access Public
const getPackages = asyncHandler(async (req, res)=>{
    const packages = await Package.find({});
    res.json(packages);
})

// @desc Fetch as single products
// @route GET /api/package/:id
// @access Public
const getPackageById = asyncHandler(async (req, res)=>{
    const packageItem = await Package.findById(req.params.id);
    if (packageItem) {
      return res.json(packageItem); 
    } else{
        res.status(404);
        throw new Error('Package not found');
    }
})

export {getPackageById, getPackages};