import { baseApi } from "@/redux/api/api";

const contactApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    contactInfo: build.mutation({
      query(body) {
        return {
          url: "/contact",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useContactInfoMutation } = contactApiSlice;
