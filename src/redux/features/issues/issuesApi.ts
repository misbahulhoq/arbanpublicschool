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
    getIssuesData: build.query<unknown, void>({
      query: () => ({ url: "/issues" }),
    }),
  }),
});

export const { useAddIssueDataMutation, useGetIssuesDataQuery } =
  issuesApiSlice;
