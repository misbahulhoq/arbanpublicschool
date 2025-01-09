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
        providesTags: ["Events"],
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
      updateEventById: build.mutation({
        query(args) {
          const { id, body } = args;
          return {
            url: `/events/${id}`,
            method: "PUT",
            body,
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
  useUpdateEventByIdMutation,
} = eventsApiSlice;
