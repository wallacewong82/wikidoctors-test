import asyncHandler from "../middleware/asyncHandler.js";
import Appointment from "../models/appointmentModel.js";
import Specialist from "../models/specialistModel.js";
import nodemailer from "nodemailer";
// @desc create appointment
// @route POST /api/appointments
// @access Public
const newAppointment = asyncHandler(async (req, res) => {
  const {
    eventtitle,
    time,
    date,
    clinicname,
    clinicID,
    clinicAddress,
    doctorname,
    patientName,
    patientEmail,
    patientPhone,
    patientComments,
    taggedaccount,
  } = req.body;
  const appointment = new Appointment({
    eventtitle,
    clinicname,
    clinicID,
    clinicAddress,
    doctorname,
    time,
    date,
    patientName,
    patientEmail,
    patientPhone,
    patientComments,
    bookingStatus: "pending",
    taggedaccount,
  });
  try {
    const createdAppointment = await appointment.save();
    const appointmentContent =
      "Thank you for booking an appointment with WikiDoctors.com! \n\nYou indicated your preferred appointment date with: " +
      doctorname +
      " at " +
      clinicname +
      " on " +
      date +
      " " +
      time +
      "hrs.\n\nThe clinic address is given as: " +
      clinicAddress +
      ".\n\n" +
      "Your details are given as: \nName: " +
      patientName +
      ",\nEmail: " +
      patientEmail +
      ",\nPhone: " +
      patientPhone +
      "\n\n" +
      (patientComments !== ""
        ? "You also provided the following memo for the clinic (which will be relayed to them): " +
          patientComments +
          "\n\n"
        : "") +
      "We will reach the clinic and confirm your appointment via email within the next 2 hours. \n\nIf we do not get a confirmation from the clinic, we will send an email with an alternative preferred provider within the next 6 hours for your confirmation.\n\nThank you for your patience and trust in us.\n\nWe look forward to hearing from you again!\n\nSincerely,\nThe WikiDoctors.com team";
    sendEmail({
      to: patientEmail,
      content: appointmentContent,
      subject: eventtitle,
    });
    res.status(201).json(createdAppointment);
    console.log("created");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating appointment", error: err });
  }
});

// @desc Fetch as appointments
// @route GET /api/appointments
// @access Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({});
  res.json(appointments);
});

// @desc Fetch as single clinic
// @route GET /api/appointments/:id
// @access Private/Admin
const getAppointmentsByIndividualID = asyncHandler(async (req, res) => {
  const indivAppointments = await Appointment.findById(req.params.id);
  if (indivAppointments) {
    return res.json(indivAppointments);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc Update an appointment
// @route PUT /api/appointments/individual/:id
// @access Private/Admin
const updateAppointment = asyncHandler(async (req, res) => {
  const {
    eventtitle,
    appointmenttime,
    appointmentdate,
    clinicname,
    clinicID,
    clinicAddress,
    doctorname,
    patientName,
    patientEmail,
    patientPhone,
    patientComments,
    bookingStatus,
    taggedaccount,
  } = req.body;

  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    appointment.eventtitle = eventtitle;
    appointment.time = appointmenttime;
    appointment.date = appointmentdate;
    appointment.clinicname = clinicname;
    appointment.clinicID = clinicID;
    appointment.clinicAddress = clinicAddress;
    appointment.doctorname = doctorname;
    appointment.patientName = patientName;
    appointment.patientEmail = patientEmail;
    appointment.patientPhone = patientPhone;
    appointment.patientComments = patientComments;
    appointment.taggedaccount = taggedaccount;
    appointment.bookingStatus = bookingStatus;
    const updatedAppointment = await appointment.save();
    if (bookingStatus === "confirmed") {
      const eventtitle = "<WikiDoctors.com> Your appointment confirmation";
      const appointmentContent =
        "Dear" +
        patientName +
        ",\n" +
        "Thank you again for booking an appointment with WikiDoctors.com \n\nYour appointment is now confirmed for: " +
        doctorname +
        " at " +
        clinicname +
        " on " +
        appointmentdate +
        " " +
        appointmenttime +
        "hrs.\n\nThe clinic address is given as: " +
        clinicAddress +
        ".\n\n" +
        "Your details are given as: \nName: " +
        patientName +
        ",\nEmail: " +
        patientEmail +
        ",\nPhone: " +
        patientPhone +
        "\n\n" +
        (patientComments !== ""
          ? "You also provided the following memo for the clinic (which will be relayed to them): " +
            patientComments +
            "\n\n"
          : "") +
        "Thank you for your support!\n\nSincerely,\nThe WikiDoctors.com team";
      sendEmail({
        to: patientEmail,
        content: appointmentContent,
        subject: eventtitle,
      });
      console.log("email sent confirmed");
    }
    if (bookingStatus === "canceled") {
      const eventtitle = "<WikiDoctors.com> Your appointment is canceled";
      const appointmentContent =
        "Dear" +
        patientName +
        ",\n" +
        "Your appointment has been canceled for:\n\n" +
        doctorname +
        " at " +
        clinicname +
        " on " +
        appointmentdate +
        " " +
        appointmenttime +
        "hrs.\n\nThe clinic address is given as: " +
        clinicAddress +
        ".\n\n" +
        "Your details are given as: \nName: " +
        patientName +
        ",\nEmail: " +
        patientEmail +
        ",\nPhone: " +
        patientPhone +
        "\n\n" +
        (patientComments !== ""
          ? "You also provided the following memo for the clinic (which will be relayed to them): " +
            patientComments +
            "\n\n"
          : "") +
        "We hope we will be able to serve you again next time.\n\nWe look forward to hearing from you again!\n\nSincerely,\nThe WikiDoctors.com team";
      sendEmail({
        to: patientEmail,
        content: appointmentContent,
        subject: eventtitle,
      });
      console.log("email send canceled");
    }

    res.status(201).json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Delete an appointment
// @route DELETE /api/appointments/:id
// @access Private/Admin
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    await Appointment.deleteOne({ _id: appointment._id });
    res.status(200).json({ message: "Appointment deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// // @desc Fetch by taggedaccount
// // @route GET /api/dashboard
// // @access Private
const getAppointmentsByAccount = asyncHandler(async (req, res) => {
  const indivAppointments = await Appointment.find({
    taggedaccount: req.user.email,
  });
  if (indivAppointments) {
    return res.json(indivAppointments);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// // @desc Fetch by taggedaccount
// // @route GET /api/dashboard/:id
// // @access Private
// const getAppointmentsByAccountByID = asyncHandler(async (req, res) => {
//   const indivAppointments = await Appointment.findOne({
//     taggedaccount: req.user.email,
//     _id: req.params.id,
//   });
//   if (indivAppointments) {
//     return res.json(indivAppointments);
//   } else {
//     res.status(404);
//     throw new Error("Appointment not found");
//   }
// });

// // @desc Update an appointment by tagged account
// // @route PUT /api/dashboard/:id
// // @access Private/Admin
const updateAppointmentByAccountById = asyncHandler(async (req, res) => {
  const { bookingStatus } = req.body;

  const appointment = await Appointment.findOne({
    taggedaccount: req.user.email,
    _id: req.params.id,
  });

  if (appointment) {
    appointment.bookingStatus = bookingStatus;
    const updatedAppointment = await appointment.save();
    res.status(201).json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// // @desc Fetch by clinic id
// // @route GET /api/appointments/:clinicId/:date
// // @access Public
const getAppointmentsByClinicId = asyncHandler(async (req, res) => {
  const todayDate = new Date();
  const threeWeeksLaterDate = new Date();
  threeWeeksLaterDate.setDate(todayDate.getDate() + 21); // Add 21 days (3 weeks) to today's date
  const matchingAppointmentsForClinic = await Appointment.find({
    clinicID: req.params.id,
    $expr: {
      $and: [
        { $gte: [{ $toDate: "$date" }, todayDate] },
        { $lt: [{ $toDate: "$date" }, threeWeeksLaterDate] },
        { $in: ["$bookingStatus", ["confirmed", "pending"]] },
      ],
    },
  });
  if (matchingAppointmentsForClinic) {
    const appointmentsData = matchingAppointmentsForClinic.map(
      (appointment) => ({
        date: appointment.date,
        time: appointment.time, // Assuming you have a field named "time" in your Appointment schema
      })
    );
    return res.json(appointmentsData);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

function sendEmail({ to, content, subject }) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Gmail SMTP port
    secure: false,
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: to, // Placeholder for recipient email
    subject: subject,
    text: content,
  };

  // Send email
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}
export {
  getAppointments,
  getAppointmentsByIndividualID,
  getAppointmentsByAccount,
  newAppointment,
  updateAppointment,
  deleteAppointment,
  // getAppointmentsByAccountByID,
  updateAppointmentByAccountById,
  getAppointmentsByClinicId,
};
