import mongoose from "mongoose";

const bloodProfileSchema = mongoose.Schema({
  fbc: {
    type: Boolean,
    required: false,
  },
  haemoglobin: {
    type: Boolean,
    required: false,
  },
  haematocrit: {
    type: Boolean,
    required: false,
  },
  mcv: {
    type: Boolean,
    required: false,
  },
  mch: {
    type: Boolean,
    required: false,
  },
  mchConc: {
    type: Boolean,
    required: false,
  },
  rbcDistributionWidth: {
    type: Boolean,
    required: false,
  },
  meanPlateletVol: {
    type: Boolean,
    required: false,
  },
  plateletCount: {
    type: Boolean,
    required: false,
  },
  wbcCount: {
    type: Boolean,
    required: false,
  },
  diffWbcCount: {
    type: Boolean,
    required: false,
  },
  bloodFilm: {
    type: Boolean,
    required: false,
  },
  bloodGrouping: {
    type: Boolean,
    required: false,
  },
  esr: {
    type: Boolean,
    required: false,
  },
});
const anaemiaStudySchema = mongoose.Schema({
  ironSerum: {
    type: Boolean,
    required: false,
  },
  tibc: {
    type: Boolean,
    required: false,
  },
  folicAcidSerum: {
    type: Boolean,
    required: false,
  },
  vitB12: {
    type: Boolean,
    required: false,
  },
  varicellaIgG: {
    type: Boolean,
    required: false,
  },
  magnesium: {
    type: Boolean,
    required: false,
  },
  ferritin: {
    type: Boolean,
    required: false,
  },
});
const fatProfileSchema = mongoose.Schema({
  cholesterolTotal: {
    type: Boolean,
    required: false,
  },
  triglycerides: {
    type: Boolean,
    required: false,
  },
  hdlChol: {
    type: Boolean,
    required: false,
  },
  ldlChol: {
    type: Boolean,
    required: false,
  },
  cholHDLRatio: {
    type: Boolean,
    required: false,
  },
  creatineKinase: {
    type: Boolean,
    required: false,
  },
  homocysteine: {
    type: Boolean,
    required: false,
  },
  apoliproteinAB: {
    type: Boolean,
    required: false,
  },
  lipoproteinA: {
    type: Boolean,
    required: false,
  },
  highSensitiveCRP: {
    type: Boolean,
    required: false,
  },
});
const kidneyProfileSchema = mongoose.Schema({
  sodium: {
    type: Boolean,
    required: false,
  },
  potassium: {
    type: Boolean,
    required: false,
  },
  chloride: {
    type: Boolean,
    required: false,
  },
  bicarbonate: {
    type: Boolean,
    required: false,
  },
  urea: {
    type: Boolean,
    required: false,
  },
  creatinine: {
    type: Boolean,
    required: false,
  },
  eGFR: {
    type: Boolean,
    required: false,
  },
});
const liverProfileSchema = mongoose.Schema({
  bilirubin: {
    type: Boolean,
    required: false,
  },
  totalProtein: {
    type: Boolean,
    required: false,
  },
  albumin: {
    type: Boolean,
    required: false,
  },
  globulin: {
    type: Boolean,
    required: false,
  },
  ratioAG: {
    type: Boolean,
    required: false,
  },
  alkPhosphatase: {
    type: Boolean,
    required: false,
  },
  ast: {
    type: Boolean,
    required: false,
  },
  alt: {
    type: Boolean,
    required: false,
  },
  ggt: {
    type: Boolean,
    required: false,
  },
});
const thyroidProfileSchema = mongoose.Schema({
  t4free: {
    type: Boolean,
    required: false,
  },
  tsh: {
    type: Boolean,
    required: false,
  },
});
const mineralProfileSchema = mongoose.Schema({
  uricAcid: {
    type: Boolean,
    required: false,
  },
  calcium: {
    type: Boolean,
    required: false,
  },
  phosphate: {
    type: Boolean,
    required: false,
  },
  vitD: {
    type: Boolean,
    required: false,
  },
});
const autoimmuneProfileSchema = mongoose.Schema({
  rheumatoidFactor: {
    type: Boolean,
    required: false,
  },
  antiDS_DnaAntibody: {
    type: Boolean,
    required: false,
  },
  antiNuclearAntibody: {
    type: Boolean,
    required: false,
  },
  measlesIgG: {
    type: Boolean,
    required: false,
  },
  rubellaIgG: {
    type: Boolean,
    required: false,
  },
  ureaBreathTest: {
    type: Boolean,
    required: false,
  },
});
const diabetesStudySchema = mongoose.Schema({
  glucose: {
    type: Boolean,
    required: false,
  },
  fastingGlucose: {
    type: Boolean,
    required: false,
  },
  hbA1c: {
    type: Boolean,
    required: false,
  },
});
const viralStudySchema = mongoose.Schema({
  hepA_Ab: {
    type: Boolean,
    required: false,
  },
  hepB_Ag_Ab: {
    type: Boolean,
    required: false,
  },
  hepC_Ag: {
    type: Boolean,
    required: false,
  },
});
const tumorMarkerProfileSchema = mongoose.Schema({
  CEAColon: {
    type: Boolean,
    required: false,
  },
  AFPLiver: {
    type: Boolean,
    required: false,
  },
  PSAProstate: {
    type: Boolean,
    required: false,
  },
  CA125Ovary: {
    type: Boolean,
    required: false,
  },
  EBVSerologyNasopharynx: {
    type: Boolean,
    required: false,
  },
  CA199_Pancreas: {
    type: Boolean,
    required: false,
  },
  THCGTestis: {
    type: Boolean,
    required: false,
  },
  CA153Breast: {
    type: Boolean,
    required: false,
  },
  Gastroclear: {
    type: Boolean,
    required: false,
  },
});
const urinalysisSchema = mongoose.Schema({
  urineFEME: {
    type: Boolean,
    required: false,
  },
  urineMicroAlbumin: {
    type: Boolean,
    required: false,
  },
  urineCreatine: {
    type: Boolean,
    required: false,
  },
  urineMCR: {
    type: Boolean,
    required: false,
  },
});
const stoolAnalysisSchema = mongoose.Schema({
  occultBlood: {
    type: Boolean,
    required: false,
  },
  stoolFEME: {
    type: Boolean,
    required: false,
  },
});
const hormoneProfileSchema = mongoose.Schema({
  fsh: {
    type: Boolean,
    required: false,
  },
  luteinHormone: {
    type: Boolean,
    required: false,
  },
  hcg: {
    type: Boolean,
    required: false,
  },
  insulin: {
    type: Boolean,
    required: false,
  },
  estradiol: {
    type: Boolean,
    required: false,
  },
  progesterone: {
    type: Boolean,
    required: false,
  },
  testosterone: {
    type: Boolean,
    required: false,
  },
  prolactin: {
    type: Boolean,
    required: false,
  },
  frt4: {
    type: Boolean,
    required: false,
  },
  dheas: {
    type: Boolean,
    required: false,
  },
  cortisol: {
    type: Boolean,
    required: false,
  },
});
const serologyStudySchema = mongoose.Schema({
  hiv: {
    type: Boolean,
    required: false,
  },
  tpha: {
    type: Boolean,
    required: false,
  },
  vdrl: {
    type: Boolean,
    required: false,
  },
  herpes: {
    type: Boolean,
    required: false,
  },
  chlamydiaGonorrhea: {
    type: Boolean,
    required: false,
  },
});
const allergyProfileSchema = mongoose.Schema({
  foodAllergen: {
    type: Boolean,
    required: false,
  },
  nonFoodAllergen: {
    type: Boolean,
    required: false,
  },
});
const otherTestsSchema = mongoose.Schema({
  papSmeear: {
    type: Boolean,
    required: false,
  },
  surePathPapTest: {
    type: Boolean,
    required: false,
  },
  dental: {
    type: Boolean,
    required: false,
  },
});

const labExamSchema = mongoose.Schema({
  provider: {
    type: String,
    required: false,
  },
  bloodProfile: [bloodProfileSchema],
  anaemiaStudy: [anaemiaStudySchema],
  fatProfile: [fatProfileSchema],
  kidneyProfile: [kidneyProfileSchema],
  liverProfile: [liverProfileSchema],
  thyroidProfile: [thyroidProfileSchema],
  mineralProfile: [mineralProfileSchema],
  autoimmuneProfile: [autoimmuneProfileSchema],
  diabetesStudy: [diabetesStudySchema],
  viralStudy: [viralStudySchema],
  tumorMarkerProfile: [tumorMarkerProfileSchema],
  urinalysis: [urinalysisSchema],
  stoolAnalysis: [stoolAnalysisSchema],
  hormoneProfile: [hormoneProfileSchema],
  serologyStudy: [serologyStudySchema],
  allergyProfile: [allergyProfileSchema],
  otherTests: [otherTestsSchema],
});
//const LabExam = mongoose.model("LabExam", labExamSchema);
export default { labExamSchema };
