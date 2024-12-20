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
      invalidatesTags: ["Issues"],
    }),
    getIssuesData: build.query<unknown, void>({
      query: () => ({ url: "/issues" }),
      providesTags: ["Issues"],
    }),
    deleteIssue: build.mutation({
      query(id) {
        console.log("id", id);
        return {
          url: `/issues/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Issues"],
    }),
  }),
});

export const {
  useAddIssueDataMutation,
  useGetIssuesDataQuery,
  useDeleteIssueMutation,
} = issuesApiSlice;
