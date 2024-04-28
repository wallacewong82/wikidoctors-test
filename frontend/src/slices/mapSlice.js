import { MAP_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const mapApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMapApi: builder.query({
      query: () => ({
        url: MAP_URL,
      }),
      keepUnusedDateFor: 5,
    }),
  }),
});

export const { useGetMapApiQuery } = mapApiSlice;
