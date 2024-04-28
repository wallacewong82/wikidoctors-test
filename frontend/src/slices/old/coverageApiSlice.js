import { COVERAGE_URL } from "../../constants";
import { apiSlice } from "../apiSlice";
export const coverageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoverageDetails: builder.query({
        query:(coverageId)=>({
            url: `${COVERAGE_URL}/${coverageId}`
        }),
        keepUnusedDataFor: 5
    })
  }),
});

export const {useGetCoverageDetailsQuery} = coverageApiSlice;