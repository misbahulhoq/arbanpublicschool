import { baseApi } from "@/redux/api/api";

const usersApiSlice = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      addNewUser: build.mutation({
        query(body) {
          return {
            url: "/users",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Users"],
      }),
      getAllUsers: build.query<unknown, void>({
        query() {
          return {
            url: "/users",
          };
        },
        providesTags: ["Users"],
      }),
    };
  },
});

export const { useAddNewUserMutation, useGetAllUsersQuery } = usersApiSlice;
