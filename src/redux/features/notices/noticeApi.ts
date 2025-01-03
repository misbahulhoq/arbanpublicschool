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
    };
  },
});

export const {
  useAddNoticeMutation,
  useGetNoticesQuery,
  useGetNoticeByIdQuery,
  useDeleteNoticeByIdMutation,
} = noticeApiSlice;
