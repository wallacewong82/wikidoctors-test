const packages = [
  {
    name: "Raffles Classic",
    image: "",
    provider: [
      {
        companyName: "Raffles",
        companyLocation: "Bugis",
        companyWebsite: "www.raffleshealth.com",
        companyContact: "",
      },
    ],
    price: "150",
    writeup: "Standard package",
    gender: "Male",
    location: [
      {
        locationName: "Bugis",
        locationAddress: "BugisStreet",
      },
    ],
    numberOptions: 0,
    clinicalExam: [
      {
        heightWeight: true,
        bloodPressure: true,
        bmi: true,
        pulse: true,
        bodyComposition: false,
        visualAcuity: true,
        colorVision: true,
        tonometry: false,
        retinalPhoto: false,
        spirometry: false,
        restingECG: 1,
        stressECG: 0,
        ankleBrachialIndex: 0,
        echocardiogram2D: 0,
        scopes: [
          {
            nasoscopy: false,
            colonoscopy: false,
            gastroscopy: false,
          },
        ],
      },
    ],
    medicalConsult: [
      {
        detailedMedicalHistory: true,
        lifestyleCounselling: true,
        postReview: true,
      },
    ],
    imagingExam: [
      {
        chestXRay: 1,
        ultrasoundCarotid: 0,
        ultrasoundKidney: 0,
        ultrasoundThyroid: 0,
        ultrasoundLiver: 0,
        ultrasoundFibroscan: 0,
        ultrasoundHepatobiliary: 0,
        ultrasoundAbdomen: 0,
        uroflowmetry: 0,
        ultrasoundProstate: 0,
        ultrasoundScrotum: 0,
        ultrasoundPelvis: 0,
        ultrasoundBreast: 0,
        mammogram: 0,
        ctLung: 0,
        ctCoroAngio: 0,
        mastocheck: 0,
        mriBack: 0,
        mriNeck: 0,
        mriBrain: 0,
        boneMineralD: 0,
      },
    ],
    labExam: [
      {
        provider: null,
        bloodProfile: [
          {
            fbc: true,
            haemoglobin: true,
            haematocrit: true,
            mcv: true,
            mch: true,
            mchConc: true,
            rbcDistributionWidth: true,
            meanPlateletVol: true,
            plateletCount: true,
            wbcCount: true,
            diffWbcCount: true,
            bloodFilm: false,
            bloodGrouping: false,
            esr: false,
          },
        ],
        anaemiaStudy: null,
        fatProfile: [
          {
            cholesterolTotal: true,
            triglycerides: true,
            hdlChol: true,
            ldlChol: true,
            cholHDLRatio: true,
            creatineKinase: true,
            homocysteine: false,
            apoliproteinAB: false,
            lipoproteinA: false,
            highSensitiveCRP: false,
          },
        ],
        kidneyProfile: [
          {
            sodium: true,
            potassium: true,
            chloride: true,
            bicarbonate: false,
            urea: true,
            creatinine: true,
            eGFR: false,
          },
        ],
        liverProfile: [
          {
            bilirubin: true,
            totalProtein: true,
            albumin: true,
            globulin: true,
            ratioAG: true,
            alkPhosphatase: true,
            ast: true,
            alt: true,
            ggt: true,
          },
        ],
        thyroidProfile: [
          {
            t4free: true,
            tsh: true,
          },
        ],
        mineralProfile: [
          {
            uricAcid: true,
            calcium: false,
            phosphate: false,
            vitD: false,
          },
        ],
        autoimmuneProfile: null,
        diabetesStudy: [
          {
            glucose: true,
            fastingGlucose: false,
            hbA1c: false,
          },
        ],
        viralStudy: null,
        tumorMarkerProfile: null,
        urinalysis: [
          {
            urineFEME: true,
            urineMicroAlbumin: false,
            urineCreatine: false,
            urineMCR: false,
          },
        ],
        stoolAnalysis: [
          {
            occultBlood: true,
            stoolFEME: false,
          },
        ],
        hormoneProfile: null,
        serologyStudy: null,
        allergyProfile: null,
        otherTests: null,
      },
    ],
    addons: null,
  },
];

export default packages;
