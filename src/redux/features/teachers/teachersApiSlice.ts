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
    getTeacherById: build.query({
      query: (id) => ({
        url: "/teachers/" + id,
      }),
    }),
    updateTeacherById: build.mutation({
      query: (arg) => {
        const { id, body } = arg;
        return { url: `/teachers/${id}`, method: "PUT", body };
      },
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
  useGetTeacherByIdQuery,
  useUpdateTeacherByIdMutation,
  useDeleteTeacherByIdMutation,
} = teachersApiSlice;
