import { NEWSLETTER_URL} from "../constants";
import { apiSlice } from "./apiSlice";
export const newsletterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewsletter: builder.mutation({
      query: (data) => ({
        url: `${NEWSLETTER_URL}`,
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const {
  useCreateNewsletterMutation
} = newsletterApiSlice;
