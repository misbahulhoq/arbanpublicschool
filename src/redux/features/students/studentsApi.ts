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
      transformResponse: (response: StudentType[]) =>
        response
          .slice()
          .sort((a, b) => parseInt(a.uid, 10) - parseInt(b.uid, 10)),
      providesTags: ["Student"],
    }),
    getStudentByUid: build.query({
      query: (uid) => {
        return {
          url: `/students/${uid}`,
        };
      },
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
    deleteStudentByUid: build.mutation({
      query: (arg: { uid: string }) => {
        return {
          url: `/students/${arg.uid}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentQuery,
  useGetStudentByUidQuery,
  useUpdateStudentByUidMutation,
  useDeleteStudentByUidMutation,
} = studentApiSlice;
