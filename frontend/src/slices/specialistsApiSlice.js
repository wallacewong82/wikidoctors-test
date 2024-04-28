import { SPECIALISTS_URL, UPLOAD_URL } from "../constants";

import { apiSlice } from "./apiSlice";
export const specialistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpecialists: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: SPECIALISTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      keepUnusedDateFor: 5,
    }),
    getSpecialistDetails: builder.query({
      query: (specialistId) => ({
        url: `${SPECIALISTS_URL}/profile/${specialistId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getSpecialistsAsAdmin: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${SPECIALISTS_URL}/specialistlist`,
        params: {
          keyword,
          pageNumber,
        },
      }),
    }),
    getSpecialistDetailsAsAdmin: builder.query({
      query: (specialistId) => ({
        url: `${SPECIALISTS_URL}/specialistlist/${specialistId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteSpecialistAsAdmin: builder.mutation({
      query: (blogId) => ({
        url: `${SPECIALISTS_URL}/specialistlist/${blogId}`,
        method: "DELETE",
      }),
    }),
    createSpecialistAsAdmin: builder.mutation({
      query: () => ({
        url: `${SPECIALISTS_URL}/specialistlist`,
        method: "POST",
      }),
      invalidatesTags: ["Specialist"],
    }),
    updateSpecialistAsAdmin: builder.mutation({
      query: (data) => ({
        url: `${SPECIALISTS_URL}/specialistlist/${data.specialistId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Specialist"],
    }),
    uploadSpecImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSpecialistsQuery,
  useGetSpecialistDetailsQuery,
  useGetSpecialistsAsAdminQuery,
  useGetSpecialistDetailsAsAdminQuery,
  useCreateSpecialistAsAdminMutation,
  useDeleteSpecialistAsAdminMutation,
  useUpdateSpecialistAsAdminMutation,
  useUploadSpecImageMutation
} = specialistsApiSlice;
