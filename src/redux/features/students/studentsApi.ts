import { baseApi } from "@/redux/api/api";

const studentApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudent: build.mutation({
      query: (body) => ({ url: "/students", method: "POST", body }),
    }),
    getStudent: build.query({
      query: ({ className }) => {
        return {
          url: "/students",
          params: { class: className },
        };
      },
    }),
  }),
});

export const { useAddStudentMutation, useGetStudentQuery } = studentApiSlice;
