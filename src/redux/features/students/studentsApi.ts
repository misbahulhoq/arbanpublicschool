import { baseApi } from "@/redux/api/api";

const studentApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudent: build.mutation({
      query: (body) => ({ url: "/students", method: "POST", body }),
    }),
  }),
});

export const { useAddStudentMutation } = studentApiSlice;
