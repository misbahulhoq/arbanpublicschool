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
      }),
      getAllEvents: build.query({
        query() {
          return {
            url: "/events",
          };
        },
      }),
      getEventById: build.query({
        query(id) {
          return {
            url: `/events/${id}`,
          };
        },
      }),
    };
  },
});

export const {
  useAddNewEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
} = eventsApiSlice;
