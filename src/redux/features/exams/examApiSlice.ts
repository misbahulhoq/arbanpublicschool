import { baseApi } from "@/redux/api/api";

const examApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query<string[], { examYear: string }>({
      query: (params) => "/exams" + "?examYear=" + params.examYear,
    }),
  }),
});

export const { useGetExamsQuery } = examApiSlice;
