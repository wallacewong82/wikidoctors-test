import asyncHandler from "../middleware/asyncHandler.js";
import Specialist from "../models/specialistModel.js";

// @desc Fetch as specialists
// @route GET /api/specialists
// @access Public
const getSpecialists = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keywordarr = req.query.keyword ? req.query.keyword.split("&") : {};
  const multarr = keywordarr.length > 0 ? keywordarr[0].split("|") : {};

  const specialtyQuery = keywordarr[0]
    ? multarr.length > 1
      ? {
          specialty: {
            $elemMatch: {
              specialty: {
                $in: multarr.map((value) => new RegExp(value, "i")),
              },
            },
          },
        }
      : {
          specialty: {
            $elemMatch: {
              specialty: { $regex: new RegExp(keywordarr[0], "i") },
            },
          },
        }
    : {};

  const locationQuery = keywordarr[1]
    ? {
        location: {
          $elemMatch: {
            locationName: { $regex: new RegExp(keywordarr[1], "i") },
          },
        },
      }
    : {};

  const insurerPanelQuery = keywordarr[2]
    ? {
        insurerPanel: {
          $elemMatch: {
            insurerName: { $regex: new RegExp(keywordarr[2], "i") },
          },
        },
      }
    : {};

  const languagesQuery = keywordarr[3]
    ? {
        languages: {
          $elemMatch: {
            language: { $regex: new RegExp(keywordarr[3], "i") },
          },
        },
      }
    : {};

  const nameQuery = keywordarr[4]
    ? { name: { $regex: new RegExp(keywordarr[4], "i") } }
    : {};

  const keyword = {
    ...specialtyQuery,
    ...locationQuery,
    ...insurerPanelQuery,
    ...languagesQuery,
    ...nameQuery,
  };

  const count = await Specialist.countDocuments({ ...keyword });

  const specialists = await Specialist.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ specialists, page, pages: Math.ceil(count / pageSize), count });
});

// @desc Fetch as single specialist
// @route GET /api/screening/:id
// @access Public
const getSpecialistById = asyncHandler(async (req, res) => {
  const specialist = await Specialist.findById(req.params.id);
  if (specialist) {
    return res.json(specialist);
  } else {
    res.status(404);
    throw new Error("Specialist not found");
  }
});

// @desc delete specialist
// @route DELETE /api/specialistlist/:id
// @access Private/Admin
const deleteSpecialistByAdmin = asyncHandler(async (req, res) => {
  const specialist = await Specialist.findById(req.params.id);
  if (specialist) {
    await Specialist.deleteOne({ _id: specialist._id });
    res.status(200).json({ message: "Specialist deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Specialist not found");
  }
});

// @desc create specialist
// @route POST /api/specialistlist/:id
// @access Private/Admin
const createSpecialistByAdmin = asyncHandler(async (req, res) => {
  const specialist = new Specialist({
    name: "New Doctor",
    image: "",
    designation: "Dr",
    qualifications: "",
    writeup: "",
    MCR: "",
    specialty: [],
    languages: [],
    gender: false,
    location: [],
    clinic: [],
    insurerPanel: [],
    verified: "",
    promoted: "",
  });
  const createdSpecialist = await specialist.save();
  if (createdSpecialist) {
    res.status(201).json(createdSpecialist);
  } else {
    res.status(404);
    throw new Error("Could not create");
  }
});

// @desc Update a specialist as admin
// @route PUT /api/specialistlist/:id
// @access Private/Admin
const updateSpecialistByAdmin = asyncHandler(async (req, res) => {
  const {
    name, //ok
    image, //ok
    designation, //ok
    qualifications, //ok
    writeup, //ok
    mcr, //ok
    transformedSpecialtyArray, //ok
    transformedLangArray, //ok
    gender, //ok
    transformedLocationArray,
    clinicSet, //ok
    transformedInsurerArray, //ok
    isVerified, //ok
    isPromoted, //ok
    verifyDate,//ok
    promoteDate,//ok
  } = req.body;
  const specialist = await Specialist.findById(req.params.id);
  if (specialist) {
    specialist.name = name;
    specialist.image = image;
    specialist.designation = designation;
    specialist.qualifications = qualifications;
    specialist.writeup = writeup;
    specialist.MCR = mcr;
    specialist.specialty = transformedSpecialtyArray;
    specialist.languages = transformedLangArray;
    specialist.gender = gender;
    specialist.location = transformedLocationArray;
    specialist.clinic = clinicSet;
    specialist.insurerPanel = transformedInsurerArray;
    specialist.verified = isVerified;
    specialist.promoted = isPromoted;
    specialist.verifieddate = verifyDate;
    specialist.promoteddate = promoteDate;
    const updatedSpecialist = await specialist.save();
    res.status(201).json(updatedSpecialist);
  } else {
    res.status(404);
    throw new Error("Specialist not found");
  }
});

// @desc Fetch as specialists
// @route GET /api/admin/specialistlist/
// @access Private/admin
const getSpecialistsAsAdmin = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;
  const keywordarr = req.query.keyword ? req.query.keyword.split("&") : {};
  const multarr = keywordarr.length > 0 ? keywordarr[0].split("|") : {};
  const specialtyQuery = keywordarr[0]
    ? multarr.length > 1
      ? {
          specialty: {
            $elemMatch: {
              specialty: {
                $in: multarr.map((value) => new RegExp(value, "i")),
              },
            },
          },
        }
      : {
          specialty: {
            $elemMatch: {
              specialty: { $regex: new RegExp(keywordarr[0], "i") },
            },
          },
        }
    : {};

  const locationQuery = keywordarr[1]
    ? {
        location: {
          $elemMatch: {
            locationName: { $regex: new RegExp(keywordarr[1], "i") },
          },
        },
      }
    : {};

  const insurerPanelQuery = keywordarr[2]
    ? {
        insurerPanel: {
          $elemMatch: {
            insurerName: { $regex: new RegExp(keywordarr[2], "i") },
          },
        },
      }
    : {};

  const languagesQuery = keywordarr[3]
    ? {
        languages: {
          $elemMatch: {
            language: { $regex: new RegExp(keywordarr[3], "i") },
          },
        },
      }
    : {};

  const nameQuery = keywordarr[4]
    ? { name: { $regex: new RegExp(keywordarr[4], "i") } }
    : {};

  const keyword = {
    ...specialtyQuery,
    ...locationQuery,
    ...insurerPanelQuery,
    ...languagesQuery,
    ...nameQuery,
  };

  const count = await Specialist.countDocuments({ ...keyword });
  const specialists = await Specialist.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ specialists, page, pages: Math.ceil(count / pageSize), count });
});

// @desc Fetch as single specialist
// @route GET /api/specialistlist/:id
// @access Public
const getSpecialistByIdAsAdmin = asyncHandler(async (req, res) => {
  const specialist = await Specialist.findById(req.params.id);
  if (specialist) {
    return res.json(specialist);
  } else {
    res.status(404);
    throw new Error("Specialist not found");
  }
});

export {
  getSpecialistById,
  getSpecialists,
  getSpecialistsAsAdmin,
  deleteSpecialistByAdmin,
  createSpecialistByAdmin,
  updateSpecialistByAdmin,
  getSpecialistByIdAsAdmin,
};
