import { baseApi } from "@/redux/api/api";

const resultApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResults: build.query({
      query: (params) => ({
        url: `/results?class=${params.class}&examYear=${params.examYear}`,
      }),
    }),
  }),
});

export const { useGetResultsQuery } = resultApiSlice;
