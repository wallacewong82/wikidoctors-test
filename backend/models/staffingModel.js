import mongoose from "mongoose";
const staffingModeSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    staffFirstName:{
        type: String,
        required: true,
    },
    staffLastName:{
        type: String,
        required: true,
    },
    staffEmployeeID:{
        type:String,
        required: true,
    },
    staffRole:{
        type:String,
        required: true,
    },
    staffPhone:{
        type: String,
        required: true,
    },
    staffNationalID:{
        type: String,
        required: true,
    },
    staffAddress:{
        type: String,
        required: true,
    },
    staffMainBranch:{
        type: String,
        required: true,
    },
    isDoctor:{
        type: Boolean,
        required: true,
    },
    isNurse:{
        type: Boolean, 
        required: true,
    },
    isRadio:{
        type:Boolean,
        required: true,
    },
    professionalID:{
        type: String,
        required: true,
    },
    credentials:{
        type: String,
        required: true,
    }
},
{
  timestamps: true,
}
);
const Staffing = mongoose.model("Staffing", staffingModeSchema);

export default Staffing;

