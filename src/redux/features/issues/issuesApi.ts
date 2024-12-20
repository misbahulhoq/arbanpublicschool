import { baseApi } from "@/redux/api/api";

const issuesApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addIssueData: build.mutation({
      query(body) {
        return {
          url: "/issues",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAddIssueDataMutation } = issuesApiSlice;
