import { baseApi } from "@/redux/api/api";

const noticeApiSlice = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      addNotice: build.mutation({
        query(body) {
          return {
            url: "/notices",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Notices"],
      }),
      getNotices: build.query<unknown, void>({
        query() {
          return {
            url: "/notices",
          };
        },
        providesTags: ["Notices"],
      }),
      getActiveNotices: build.query<unknown, void>({
        query() {
          return {
            url: "/notices/status/active",
          };
        },
        providesTags: ["Notices"],
      }),
      getNoticeById: build.query({
        query(id) {
          return {
            url: `/notices/${id}`,
          };
        },
      }),
      getNoticesByQuery: build.query({
        query: (params: Record<string, string | number | boolean | null>) => {
          const queryString = Object.entries(params)
            .filter(([, value]) => value !== null && value !== undefined) // Remove null or undefined values
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
            )
            .join("&");
          return { url: `/notices?${queryString}` };
        },
        providesTags: ["Notices"],
      }),
      deleteNoticeById: build.mutation({
        query(id) {
          return {
            url: "/notices/" + id,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Notices"],
      }),
      updateNoticeById: build.mutation({
        query(arg) {
          const { id, body } = arg;
          console.log("id", id);
          console.log("body", body);
          return {
            url: `/notices/${id}`,
            method: "PUT",
            body,
          };
        },
        invalidatesTags: ["Notices"],
      }),
    };
  },
});

export const {
  useAddNoticeMutation,
  useGetNoticesQuery,
  useGetActiveNoticesQuery,
  useGetNoticeByIdQuery,
  useDeleteNoticeByIdMutation,
  useUpdateNoticeByIdMutation,
} = noticeApiSlice;
