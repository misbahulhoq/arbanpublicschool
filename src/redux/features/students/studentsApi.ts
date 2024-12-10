import { baseApi } from "@/redux/api/api";
import { StudentType } from "@/types/studentType";

const studentApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudent: build.mutation({
      query: (body) => ({ url: "/students", method: "POST", body }),
      invalidatesTags: ["Student"],
    }),
    getStudent: build.query({
      query: ({ className }) => {
        return {
          url: "/students",
          params: { class: className },
        };
      },
      providesTags: ["Student"],
    }),
    updateStudentByUid: build.mutation({
      query: (args: { uid: string; body: StudentType }) => {
        const { uid, body } = args;
        return {
          url: `/students/${uid}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentQuery,
  useUpdateStudentByUidMutation,
} = studentApiSlice;
