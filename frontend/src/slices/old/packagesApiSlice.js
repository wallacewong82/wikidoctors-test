import { PACKAGES_URL } from "../../constants";
import { apiSlice } from "../apiSlice";
export const packagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => ({
        url: PACKAGES_URL,
      }),
      keepUnusedDateFor: 5,
    }),
    getPackageDetails: builder.query({
      query: (packageId) => ({
        url: `${PACKAGES_URL}/${packageId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetPackagesQuery, useGetPackageDetailsQuery } =
  packagesApiSlice;
