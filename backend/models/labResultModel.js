import mongoose from "mongoose";

const kidneyProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sodium: {
      type: Number,
      required: false,
    },
    potassium: {
      type: Number,
      required: false,
    },
    chloride: {
      type: Number,
      required: false,
    },
    bicarbonate: {
      type: Number,
      required: false,
    },
    urea: {
      type: Number,
      required: false,
    },
    creatinine: {
      type: Number,
      required: false,
    },
    eGFR: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const liverProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bilirubin: {
      type: Number,
      required: false,
    },
    totalProtein: {
      type: Number,
      required: false,
    },
    albumin: {
      type: Number,
      required: false,
    },
    globulin: {
      type: Number,
      required: false,
    },
    alkalinePhos: {
      type: Number,
      required: false,
    },
    ratioASTtoSGOT: {
      type: Number,
      required: false,
    },
    ratioALTtoSGPT: {
      type: Number,
      required: false,
    },
    scoreGGT: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const fatProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cholesterol: {
      type: Number,
      required: false,
    },
    triglycerides: {
      type: Number,
      required: false,
    },
    cholesterolHDL: {
      type: Number,
      required: false,
    },
    cholesterolLDL: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const endocrineProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    glucose: {
      type: Number,
      required: false,
    },
    hba1c: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const boneProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    adjustedCalcium: {
      type: Number,
      required: false,
    },
    calcium: {
      type: Number,
      required: false,
    },
    phosphate: {
      type: Number,
      required: false,
    },
    uricAcid: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const miscChemistryProfile = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    iron: {
      type: Number,
      required: false,
    },
    scoreTIBC: {
      type: Number,
      required: false,
    },
    percentIS: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const urineChemistryProfile = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    urineMicroalbRandom: {
      type: Number,
      required: false,
    },
    urineCREC: {
      type: Number,
      required: false,
    },
    urineAlbCreRandom: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const thyroidProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    t4free: {
      type: Number,
      required: false,
    },
    tsh: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const tumourMarkerProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    scoreAFP: {
      type: Number,
      required: false,
    },
    scoreCEA: {
      type: Number,
      required: false,
    },
    scoreCA199: {
      type: Number,
      required: false,
    },
    scorePSATotal: {
      type: Number,
      required: false,
    },
    scoreEBV_EA_IgA_REAAD: {
      type: Number,
      required: false,
    },
    scoreEBV_REAAD_Index: {
      type: Number,
      required: false,
    },
    tumourMarkerComent: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const viralStudiesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    score_AntiHAVTotal: {
      type: String,
      required: false,
    },
    score_HBsAG: {
      type: String,
      required: false,
    },
    score_AntiHBs: {
      type: String,
      required: false,
    },
    score_AntiHBs_Count: {
      type: String,
      required: false,
    },
    score_AntiHCV: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const hormoneStudiesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    total_BetaHCG: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const miscImmunologySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    vitaminB12: {
      type: Number,
      required: false,
    },
    ferritin: {
      type: Number,
      required: false,
    },
    folicAcid: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const serologySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    score_ANA_Titre: {
      type: Number,
      required: false,
    },
    score_RheumatoidFactor: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const specialisedTestsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    vitaminD: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const bloodCountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rbc: {
      type: Number,
      required: false,
    },
    hgb: {
      type: Number,
      required: false,
    },
    haematocrit: {
      type: Number,
      required: false,
    },
    meanCellVol: {
      type: Number,
      required: false,
    },
    meanCellHDB: {
      type: Number,
      required: false,
    },
    concentrationMCH: {
      type: Number,
      required: false,
    },
    distributionWidthRBC: {
      type: Number,
      required: false,
    },
    meanPlateletVol: {
      type: Number,
      required: false,
    },
    platelet: {
      type: Number,
      required: false,
    },
    wbc: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const differentialSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    neutrophils: {
      type: Number,
      required: false,
    },
    neutrophilsNumber: {
      type: Number,
      required: false,
    },
    lymphocytes: {
      type: Number,
      required: false,
    },
    lymphocytesNumber: {
      type: Number,
      required: false,
    },
    monocytes: {
      type: Number,
      required: false,
    },
    monocytesNumber: {
      type: Number,
      required: false,
    },
    eosinophils: {
      type: Number,
      required: false,
    },
    eosinophilsNumber: {
      type: Number,
      required: false,
    },
    basophils: {
      type: Number,
      required: false,
    },
    basophilsNumber: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const redCellMorphologySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bloodfilmComments: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const urinalysisSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    urineClarity: {
      type: String,
      required: false,
    },
    urineColor: {
      type: String,
      required: false,
    },
    urineGlucose: {
      type: String,
      required: false,
    },
    urineBilirubin: {
      type: String,
      required: false,
    },
    urineKetones: {
      type: String,
      required: false,
    },
    urineSpecGrav: {
      type: String,
      required: false,
    },
    urineBlood: {
      type: String,
      required: false,
    },
    urinePH: {
      type: String,
      required: false,
    },
    urineProtein: {
      type: String,
      required: false,
    },
    urineUrobilinogen: {
      type: String,
      required: false,
    },
    urineNitrite: {
      type: String,
      required: false,
    },
    urineLeukocyteEsterase: {
      type: String,
      required: false,
    },
    urineRBC: {
      type: String,
      required: false,
    },
    urineWBC: {
      type: String,
      required: false,
    },
    urineEpithCell: {
      type: String,
      required: false,
    },
    urineBacteria: {
      type: String,
      required: false,
    },
    urineCasts: {
      type: String,
      required: false,
    },
    urineCrystals: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const stoolAnalysisSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    occultBlood: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const labResultSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    dateConducted: {
      type: Date,
      required: true,
    },
    dateReported: {
      type: Date,
      required: true,
    },
    phlebotomistName: {
      type: String,
      required: true,
    },
    timeCollected: {
      type: Date,
      required: true,
    },
    kidneyProfile: [kidneyProfileSchema],
    liverProfile: [liverProfileSchema],
    fatProfile: [fatProfileSchema],
    endocrineProfile: [endocrineProfileSchema],
    boneProfile: [boneProfileSchema],
    miscChemistry: [miscChemistryProfile],
    urineChemistry: [urineChemistryProfile],
    thyroidStudies: [thyroidProfileSchema],
    tumourMarkerStudies: [tumourMarkerProfileSchema],
    viralStudies: [viralStudiesSchema],
    hormoneStudies: [hormoneStudiesSchema],
    miscImmunology: [miscImmunologySchema],
    serology: [serologySchema],
    specialisedTests: [specialisedTestsSchema],
    bloodCount: [bloodCountSchema],
    differential: [differentialSchema],
    redCellMorphology: [redCellMorphologySchema],
    urinalysis: [urinalysisSchema],
    stoolAnalysis: [stoolAnalysisSchema],
  },
  {
    timestamps: true,
  }
);
const LabResult = mongoose.model("LabResult", labResultSchema);
export default LabResult;
