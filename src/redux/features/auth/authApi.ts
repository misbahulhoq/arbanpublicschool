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
      transformResponse: (response, meta) => {
        const headers = meta?.response?.headers;
        const authToken = headers?.get("authToken");
        console.log(headers);
        return { data: response, authToken };
      },
    }),
    getUserInfo: build.query<unknown, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      transformResponse: (response, meta) => {
        return { data: response, status: meta?.response?.statusText };
      },
    }),
    logOutUser: build.mutation({
      query(body) {
        return {
          url: "/auth/logout",
          method: "POST",
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpUserMutation,
  useLogInUserMutation,
  useGetUserInfoQuery,
  useLogOutUserMutation,
} = authApi;
