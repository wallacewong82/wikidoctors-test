import mongoose from "mongoose";
import labExamSchema from "./labExamModel.js";

const providerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyLocation: {
    type: String,
    required: false,
  },
  companyWebsite: {
    type: String,
    required: false,
  },
  companyContact: {
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
});

const medicalConsultSchema = mongoose.Schema({
  detailedMedicalHistory: {
    type: Boolean,
    required: false,
  },
  lifestyleCounselling: {
    type: Boolean,
    required: false,
  },
  postReview: {
    type: Boolean,
    required: false,
  },
});

const scopesSchema = mongoose.Schema({
  nasoscopy: {
    type: Boolean,
    required: false,
  },
  colonoscopy: {
    type: Boolean,
    required: false,
  },
  gastroscopy: {
    type: Boolean,
    required: false,
  },
});

const clinicalExamSchema = mongoose.Schema({
  heightWeight: {
    type: Boolean,
    required: false,
  },
  bloodPressure: {
    type: Boolean,
    required: false,
  },
  bmi: {
    type: Boolean,
    required: false,
  },
  pulse: {
    type: Boolean,
    required: false,
  },
  bodyComposition: {
    type: Boolean,
    required: false,
  },
  visualAcuity: {
    type: Boolean,
    required: false,
  },
  colorVision: {
    type: Boolean,
    required: false,
  },
  tonometry: {
    type: Boolean,
    required: false,
  },
  retinalPhoto: {
    type: Boolean,
    required: false,
  },
  spirometry: {
    type: Boolean,
    required: false,
  },
  restingECG: {
    type: Number,
    required: false,
  },
  stressECG: {
    type: Number,
    required: false,
  },
  ankleBrachialIndex: {
    type: Number,
    required: false,
  },
  echocardiogram2D: {
    type: Number,
    required: false,
  },
  scopes: [scopesSchema],
});

const imagingExamSchema = mongoose.Schema({
  chestXRay: {
    type: Number,
    required: false,
  },
  ultrasoundCarotid: {
    type: Number,
    required: false,
  },
  ultrasoundKidney: {
    type: Number,
    required: false,
  },
  ultrasoundThyroid: {
    type: Number,
    required: false,
  },
  ultrasoundLiver: {
    type: Number,
    required: false,
  },
  ultrasoundFibroscan: {
    type: Number,
    required: false,
  },
  ultrasoundHepatobiliary: {
    type: Number,
    required: false,
  },
  ultrasoundAbdomen: {
    type: Number,
    required: false,
  },
  uroflowmetry: {
    type: Number,
    required: false,
  },
  ultrasoundProstate: {
    type: Number,
    required: false,
  },
  ultrasoundScrotum: {
    type: Number,
    required: false,
  },
  ultrasoundPelvis: {
    type: Number,
    required: false,
  },
  ultrasoundBreast: {
    type: Number,
    required: false,
  },
  mammogram: {
    type: Number,
    required: false,
  },
  ctLung: {
    type: Number,
    required: false,
  },
  ctCoroAngio: {
    type: Number,
    required: false,
  },
  mastocheck: {
    type: Number,
    required: false,
  },
  mriBack: {
    type: Number,
    required: false,
  },
  mriNeck: {
    type: Number,
    required: false,
  },
  mriBrain: {
    type: Number,
    required: false,
  },
  boneMineralD: {
    type: Number,
    required: false,
  },
});

const addonSchema = mongoose.Schema({
  homeService: {
    type: Boolean,
    required: false,
  },
  sameDayBooking: {
    type: Boolean,
    required: false,
  },
  sameDayReport: {
    type: Boolean,
    required: false,
  },
  languageReport: {
    type: String,
    required: false,
  },
});

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    provider: [providerSchema],
    price: {
      type: String,
      required: false,
    },
    writeup: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    location: [locationSchema],

    numberOptions: {
      type: Number,
      required: true,
    },
    clinicalExam: [clinicalExamSchema],
    medicalConsult: [medicalConsultSchema],
    imagingExam: [imagingExamSchema],
    labExam: [labExamSchema],
    addons: [addonSchema],
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
