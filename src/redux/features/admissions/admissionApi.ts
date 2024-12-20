import { baseApi } from "@/redux/api/api";

const admissionApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdmissionData: build.mutation({
      query(body) {
        return {
          url: "/admissions",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAddAdmissionDataMutation } = admissionApiSlice;
