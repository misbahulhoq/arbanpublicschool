import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://api-arbanpublicschool.vercel.app";
// const baseUrl = "https://api-arbanpublicschool.vercel.app";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["Student", "Issues", "Users", "Numbers", "Notices"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) headers.set("authToken", authToken);
      return headers;
    },
  }),

  endpoints: () => ({}),
});
