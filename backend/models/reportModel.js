import mongoose from "mongoose";
import LabResult from "./labResultModel";

const preScreenResultSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    dateConducted:{
        type: Date,
        required: true,
    },
    dateReported:{
        type: Date,
        required: true,
    },
    drugAllergy:{
        type: String,
        required: true,
    },
    exercise:{
        type: String,
        required: true,
    }, 
    smoking:{
        type: String,
        required: true,
    },
    smoker:{
        type: String,
        required: true,
    },
    alcohol:{
        type: String,
        required: true,
    },
    familyFather:{
        type: String,
        required: true,
    }, 
    familyMother:{
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const radResultSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    dateConducted:{
        type: Date,
        required: true,
    },
    dateReported:{
        type: Date,
        required: true,
    },
    bodyPartScanned:{
        type: String,
        required: true,
    },
    scanType:{
        type: String,
        required: true,
    },
    performingRadioName:{
        type: String,
        required: true,
    },
    performingClinic:{
        type: String,
        required: true,
    }, 
    performingRadComments:{
        type: String,
        required: true,
    },
    radiologistName:{
        type: String,
        required: true,
    }, 
    radiologistClinic:{
        type:String,
        required: true,
    },
    radiologistFindings:{
        type:String,
        required: true,
    }
}, {
    timestamps: true,
})

const bodyCheckResultSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    dateConducted:{
        type: Date,
        required: true,
    },
    dateReported:{
        type: Date,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    height:{
        type: Number,
        required: true,
    },
    weight:{
        type: Number,
        required: true,
    },
    diabolicBP:{
        type: Number,
        required: true,
    },
    systolicBP:{
        type: Number,
        required: true,
    },
    pulse:{
        type: Number,
        required: true,
    }, 
    bodyFat:{
        type: Number,
        required: true,
    },
    bmi:{
        type: Number,
        required: true,
    },
    spirometryFVC:{
        type: Number,
        required: true,
    },
    spirometryFEV1:{
        type: Number,
        required: true,
    }

}, {
    timestamps: true,
})

const doctorResultSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    dateConducted:{
        type: Date,
        required: true,
    },
    dateReported:{
        type: Date,
        required: true,
    },
    doctorName:{
        type: String,
        required: true,
    },
    doctorMedNumber:{
        type: String,
        required: true,
    },
    genHealth:{
        type: String,
        required: true,
    },
    skin:{
        type: String,
        required: true,
    },
    face: {
        type: String,
        required: true,
    },
    eyes:{
        type: String,
        required: true,
    }, 
    ears:{
        type: String,
        required: true
    },
    nose:{
        type: String,
        required: true,
    },
    oralcavity:{
        type:String,
        required: true,
    }, 
    thyroid:{
        type: String,
        required: true,
    },
    lymphnodes:{
        type: String,
        required: true,
    },
    farvision:{
        type:String,
        required: true,
    }, 
    nearvision:{
        type: String,
        required: true,
    },
    colorvision:{
        type: String,
        required: true,
    },
    digitalretina:{
        type:String,
        required: true,
    },
    tonometry:{
        type: String,
        required: true,
    }, 
    ultrasoundCIMT:{
        type: String,
        required: true,
    },
    respiratorySystem:{
        type:String,
        required: true,
    },
    cardioSystem:{
        type: String,
        required: true,
    },
    restingECG:{
        type: String,
        required: true,
    }, 
    stressECG:{
        type: String, 
        required: true,
    }, 
    spirometry: { 
        type:String,
        required: true,
    }, 
    chestXRay:{
        type: String,
        required: true,
    },
    neuralSystem:{
        type: String,
        required: true,
    }, 
    mskSystem:{
        type: String,
        required: true,
    },
    bmdSystem:{
        type: String,
        required: true,
    },
    abdomenSystem:{
        type:String,
        required: true,
    },
    ultrasoundAbdomen:{
        type: String,
        required: true,
    }, 
    ultrasoundProstate:{
        type: String,
        required: true,
    }, 
    mammogram:{
        type: String,
        required: true,
    }, 
    ultrasoundCarotid:{
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const hsReportSchema = mongoose.Schema(
    {
        preScreenResult: [preScreenResultSchema],
        labResult: LabResult,
        radResult: [radResultSchema],
        bodyCheckResult:[bodyCheckResultSchema],
        doctorResult:[doctorResultSchema]
    },
    {
      timestamps: true,
    }
  );
  const HSReport = mongoose.model("HSReport", hsReportSchema);

  export default HSReport;
  