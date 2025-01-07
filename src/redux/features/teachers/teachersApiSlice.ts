import { baseApi } from "@/redux/api/api";

const teachersApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTeacher: build.mutation({
      query: (body) => ({
        url: "/teachers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teachers"],
    }),
    getAllTeachers: build.query<unknown, void>({
      query: () => ({
        url: "/teachers",
      }),
      providesTags: ["Teachers"],
    }),
    deleteTeacherById: build.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useAddTeacherMutation,
  useGetAllTeachersQuery,
  useDeleteTeacherByIdMutation,
} = teachersApiSlice;
