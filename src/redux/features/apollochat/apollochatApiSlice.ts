import { baseApi } from "@/redux/api/api";

const apolloChatApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    apolloChat: builder.mutation({
      query(body) {
        return {
          url: "/apollochat",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useApolloChatMutation } = apolloChatApiSlice;
