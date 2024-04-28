import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
      eventtitle: {
        type: String,
        required: true,
      },
      clinicname:{
        type:String,
        required: true,
      },
      clinicID:{
        type:String,
        required:true,
      },
      clinicAddress:{
        type:String,
        required:true,
      },
      doctorname:{
        type:String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      patientName:{
        type: String,
        required: true,
      },
      patientEmail:{
        type:String,
        required:true,
      },
      patientPhone:{
        type:String,
        required: true,
      },
      patientComments:{
        type:String,
        required: false,
      },
      bookingStatus: { //pending, confirmed, canceled, completed, rescheduled, noshow
        type: String,
        required: true,
      },
      taggedaccount:{
        type:String,
        required: false,
      }
    },
    {
      timestamps: true,
    }
  );
const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;

