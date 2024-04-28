import { APPOINTMENTS_URL, DASHBOARD_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const appointmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => ({
        url: `${APPOINTMENTS_URL}/appointmentlist`,
      }),
      providesTags: ["Appointments"],
      keepUnusedDateFor: 5,
    }),
    getAppointmentById: builder.query({
      query: (appointmentId) => ({
        url: `${APPOINTMENTS_URL}/appointmentlist/${appointmentId}`,
      }),
      keepUnusedDateFor: 5,
    }),
    newAppointment: builder.mutation({
      query: (data) => ({
        url: APPOINTMENTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/appointmentlist/${data.appointmentId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),
    deleteAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `${APPOINTMENTS_URL}/appointmentlist/${appointmentId}`,
        method: "DELETE",
      }),
    }),
    getAppointmentsByAccount: builder.query({
      query: () => ({
        url: DASHBOARD_URL,
      }),
      invalidatesTags: ["Appointments"],
      keepUnusedDateFor: 5,
    }),
    // getAppointmentsByAccountByID: builder.query({
    //   query: (appointmentId) => ({
    //     url: `${DASHBOARD_URL}/${appointmentId}`,
    //   }),
    //   keepUnusedDateFor: 5,
    // }),

    updateAppointmentByAccountById: builder.mutation({
      query: (data) => ({
        url: `${DASHBOARD_URL}/${data.appointmentId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),
    getAppointmentsByClinicId: builder.query({ 
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/${data}`,
      }),
      keepUnusedDateFor: 5,
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useNewAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentsByAccountQuery,
 //useGetAppointmentsByAccountByIDQuery
  useUpdateAppointmentByAccountByIdMutation,
  useGetAppointmentsByClinicIdQuery,
} = appointmentsApiSlice;
