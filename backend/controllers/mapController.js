import asyncHandler from "../middleware/asyncHandler.js";
import Map from "../models/mapModel.js";

// @desc Fetch as maps
// @route GET /api/map
// @access Public
const getMaps = asyncHandler(async (req, res)=>{
    const maps = await process.env.REACT_APP_GOOGLE_MAPS_API;
    res.json(maps);
})


export {getMaps};