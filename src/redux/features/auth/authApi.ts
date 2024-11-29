import { baseApi } from "@/redux/api/api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUpUser: build.mutation({
      query(body) {
        return {
          url: "/auth/signup",
          method: "POST",
          body,
        };
      },
    }),
    logInUser: build.mutation({
      query(body) {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpUserMutation, useLogInUserMutation } = authApi;
