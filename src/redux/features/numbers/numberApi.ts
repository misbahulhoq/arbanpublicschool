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
  }),
  overrideExisting: false,
});

export const {
  useAddNumberMutation,
  useGetNumberQuery,
  useGetNumberByUidQuery,
  useGetNumberByIdQuery,
} = numbersApiSlice;
