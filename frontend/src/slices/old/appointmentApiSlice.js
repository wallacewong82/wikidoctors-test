import { createSlice } from "@reduxjs/toolkit";
import { updateAppointment } from "../../utils/appointmentUtils.js";
const initialState = localStorage.getItem("appointment")
  ? JSON.parse(localStorage.getItem("appointment"))
  : { appointmentItems: [] };

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointment: (state, action) => {
      const appt = action.payload;
      state.appointmentItems = [...state.appointmentItems, appt];
      return updateAppointment(state);
      //   const existAppt = state.appointmentItems.find((x)=>x._id === appt.id);
      // if(existAppt){
      //     state.appointmentItems = state.appointmentItems.map((x)=>x._id===existAppt._id)
      // }
    },
    cancelAppointment: (state, action) => {
      state.appointmentItems = [];
      return updateAppointment(state);
    },
    editAppointment: (state, action) => {
      const appt = action.payload;
      const existAppt = state.appointmentItems.find((x) => x._id === appt._id);
      if (existAppt) {
        state.appointmentItems = state.appointmentItems.map((x) =>
          x._id === existAppt._id ? appt : x
        );
      } else {
        state.appointmentItems = [...state.appointmentItems, appt];
      }
      return updateAppointment(state);
    },
    resetAppointment: (state) => (state = initialState),
  },
});

export const {
  setAppointment,
  cancelAppointment,
  editAppointment,
  resetAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
