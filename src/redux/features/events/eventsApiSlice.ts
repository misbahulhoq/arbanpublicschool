import { baseApi } from "@/redux/api/api";

const eventsApiSlice = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      addNewEvent: build.mutation({
        query(body) {
          return {
            url: "/events",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Events"],
      }),
      getAllEvents: build.query<unknown, void>({
        query() {
          return {
            url: "/events",
          };
        },
        providesTags: ["Events"],
      }),
      getEventById: build.query({
        query(id) {
          return {
            url: `/events/${id}`,
          };
        },
      }),
      deleteEventById: build.mutation({
        query(id) {
          return {
            url: `/events/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Events"],
      }),
    };
  },
});

export const {
  useAddNewEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useDeleteEventByIdMutation,
} = eventsApiSlice;
