import { PUBLICFEEDBACK_URL} from "../constants";
import { apiSlice } from "./apiSlice";
export const pfeedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPublicFeedback: builder.mutation({
      query: (data) => ({
        url: `${PUBLICFEEDBACK_URL}`,
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const {
  useCreatePublicFeedbackMutation
} = pfeedbackApiSlice;
