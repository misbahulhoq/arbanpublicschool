import { baseApi } from "@/redux/api/api";

const numbersApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addNumber: build.mutation({
      query: (body) => ({ url: "/numbers", method: "POST", body }),
    }),
    getNumber: build.query({
      query: () => {
        return { url: "/numbers" };
      },
    }),
  }),
});

export const { useAddNumberMutation, useGetNumberQuery } = numbersApiSlice;
