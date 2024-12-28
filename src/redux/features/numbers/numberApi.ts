import { baseApi } from "@/redux/api/api";

const numbersApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addNumber: build.mutation({
      query: (body) => ({ url: "/numbers", method: "POST", body }),
    }),
    getNumber: build.query<unknown, void>({
      query: () => {
        return { url: "/numbers" };
      },
    }),
    getNumberByUid: build.query({
      query: (uid: string | null) => {
        return { url: `/numbers/${uid}` };
      },
    }),
    getNumberById: build.query({
      query: (id: string | null) => {
        return { url: `/numbers/id/${id}` };
      },
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
} = numbersApiSlice;
