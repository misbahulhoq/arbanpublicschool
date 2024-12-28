import { baseApi } from "@/redux/api/api";

const numbersApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addNumber: build.mutation({
      query: (body) => ({ url: "/numbers", method: "POST", body }),
      invalidatesTags: ["Numbers"],
    }),
    getNumber: build.query<unknown, void>({
      query: () => {
        return { url: "/numbers" };
      },
      providesTags: ["Numbers"],
    }),
    getNumberByUid: build.query({
      query: (uid: string | null) => {
        return { url: `/numbers/${uid}` };
      },
      providesTags: ["Numbers"],
    }),
    getNumberById: build.query({
      query: (id: string | null) => {
        return { url: `/numbers/id/${id}` };
      },
      providesTags: ["Numbers"],
    }),
    getNumberWithParams: build.query({
      query: (params: Record<string, string | number | boolean | null>) => {
        const queryString = Object.entries(params)
          .filter(([, value]) => value !== null && value !== undefined) // Remove null or undefined values
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
          )
          .join("&");
        return { url: `/numbers?${queryString}` };
      },
      providesTags: ["Numbers"],
    }),
    deleteNumberWithParams: build.mutation({
      query: (params: Record<string, string | number | boolean | null>) => {
        const queryString = Object.entries(params)
          .filter(([, value]) => value !== null && value !== undefined) // Remove null or undefined values
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
          )
          .join("&");
        return { url: `/numbers?${queryString}`, method: "DELETE" };
      },
      invalidatesTags: ["Numbers"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddNumberMutation,
  useGetNumberQuery,
  useGetNumberByUidQuery,
  useGetNumberByIdQuery,
  useGetNumberWithParamsQuery,
  useDeleteNumberWithParamsMutation,
} = numbersApiSlice;
