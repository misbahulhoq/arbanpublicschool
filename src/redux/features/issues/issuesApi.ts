import { FormData } from "@/app/dashboard/(teachersroute)/issues/page";
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
    getIssueDataById: build.query<unknown, void>({
      query: (id) => ({ url: `/issues/${id}` }),
      providesTags: ["Issues"],
    }),
    deleteIssue: build.mutation({
      query(id) {
        return {
          url: `/issues/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Issues"],
    }),
    updateIssue: build.mutation({
      query(args: { id: string; body: FormData }) {
        const { id, body } = args;
        return {
          url: `/issues/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useAddIssueDataMutation,
  useGetIssueDataByIdQuery,
  useGetIssuesDataQuery,
  useDeleteIssueMutation,
  useUpdateIssueMutation,
} = issuesApiSlice;
