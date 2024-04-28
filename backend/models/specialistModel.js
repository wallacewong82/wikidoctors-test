import mongoose from "mongoose";
const insurerPanelSchema = mongoose.Schema(
  {
    insurerName: {
      type: String,
      required: false,
    },
    panelType: {
      type: String,
      required: false,
    },
    panelBenefits: {
      type: String,
      required: false,
    },
    panelJoinDate: {
      type: Date,
      required: false,
    },
    panelEndDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const clinicSchema = mongoose.Schema({
  clinicName: {
    type: String,
    required: true,
  },
  clinicAddress: {
    type: String,
    required: true,
  },
  clinicPhone: {
    type: String,
    required: false,
  },
  clinicHours: {
    type: String,
    required: false,
  },
  clinicSite: {
    type: String,
    required: false,
  },
  clinicMail: {
    type: String,
    required: false,
  },
  clinicLongitude: {
    type: String,
    required: false,
  },
  clinicLatitude: {
    type: String,
    required: false,
  },
});
const locationSchema = mongoose.Schema({
  locationName: {
    type: String,
    required: false,
  },
  locationAddress: {
    type: String,
    required: false,
  },
  locationLongitude:{
    type: String,
    required: false,
  },
  locationLatitude:{
    type: String,
    required: false,
  }
});
const languagesSchema = mongoose.Schema({
  language: {
    type: String,
    required: false,
  },
  fluency: {
    type: String,
    required: false,
  },
});
const specialtySchema = mongoose.Schema({
  specialty: {
    type: String,
    required: false,
  },
  subspecialty: {
    type: String,
    required: false,
  },
  clinicalinterest:{
    type: String,
    required: false,
  }
});
const qualificationsSchema = mongoose.Schema({
  qualificationName: {
    type: String,
    required: false,
  },
  qualificationPlace: {
    type: String,
    required: false,
  },
  qualificationDate: {
    type: String,
    required: false,
  },
});
const specialistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    designation: {
      type: String,
      required: false,
    },
    qualifications: {
      type: String,
      required: false,
    },
    writeup: {
      type: String,
      required: false,
    },
    MCR: {
      type: String,
      required: false,
    },
    specialty: [specialtySchema],
    languages: [languagesSchema],
    gender: {
      type: String,
      required: false,
    },
    location: [locationSchema],
    clinic: [clinicSchema],
    insurerPanel: [insurerPanelSchema],
    verified: {
      type: String,
      required: false,
    },
    promoted:{
      type:String,
      required:false,
    },
    verifieddate: {
      type: String,
      required: false,
    },
    promoteddate: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const Specialist = mongoose.model("Specialist", specialistSchema);
// const Clinic = mongoose.model("Clinic",clinicSchema)
export default Specialist;
