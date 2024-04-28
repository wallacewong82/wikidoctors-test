import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      netPromoterScore: {
        type: Number,
        required: true,
      },
      npsComment:{
        type:String,
        required: false,
      },
      feedbackNature:{
        type: Number,
        required: false
      },
      waitingTimeScore: {
        type: Number,
        required: false,
      },
      staffServiceScore: {
        type: Number,
        required: false,
      },
      facilityServiceScore:{
        type: Number,
        required: false,
      },
      reportServiceScore:{
        type: Number,
        required: false,
      },
      appointmentServiceScore:{
        type: Number,
        required: false,
      },
      overallExperienceScore:{
        type: Number,
        required: false,
      },
      feedbackComment:{
        type: String,
        required: false,
      },
      provider: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      dateAppointment: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  // const Feedback = mongoose.model("Feedback", feedbackSchema);

  export default {feedbackSchema};
  