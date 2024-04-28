import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const corporateDependent = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dependentName: {
    type: String,
    required: false,
  },
  dependentStatus: {
    type: String,
    required: false,
  },
  dependentLimit: {
    type: String,
    required: false,
  },
  dependentBalance: {
    type: Number,
    required: false,
  },
});
const corporateDetailsSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  corporateID: {
    type: String,
    required: true,
  },
  corporateAddress: {
    type: String,
    required: true,
  },
  corporatePostalCode: {
    type: Number,
    required: true,
  },
  claimLimit: {
    type: Number,
    required: true,
  },
  claimBalance: {
    type: Number,
    required: false,
  },
  numDependents: {
    type: Number,
    required: false,
  },
  dependentDetails: [corporateDependent],
});
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    chineseName: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    idType: {
      type: Boolean,
      required: false,
    },
    idNumber: {
      type: String,
      required: false,
    },
    gender: {
      type: Number,
      required: false,
    },
    MCR:{
      type: String,
      required:false,
    },
    nationality: {
      type: String,
      required: false,
    },
    countryCode: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    homeAddress: {
      type: String,
      required: false,
    },
    homePostalCode: {
      type: Number,
      required: false,
    },
    isCorporate: {
      type: Boolean,
      required: false,
    },
    corporateDetails: [corporateDetailsSchema],
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

export default User;
