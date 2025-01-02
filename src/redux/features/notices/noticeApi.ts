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
      }),
      getNotices: build.query({
        query() {
          return {
            url: "/notices",
          };
        },
      }),
      getNoticeById: build.query({
        query(id) {
          return {
            url: `/notices/${id}`,
          };
        },
      }),
    };
  },
});

export const {
  useAddNoticeMutation,
  useGetNoticesQuery,
  useGetNoticeByIdQuery,
} = noticeApiSlice;
