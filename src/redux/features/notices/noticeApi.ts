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
      getNotices: build.query<unknown, void>({
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
    };
  },
});

export const {
  useAddNoticeMutation,
  useGetNoticesQuery,
  useGetNoticeByIdQuery,
} = noticeApiSlice;
