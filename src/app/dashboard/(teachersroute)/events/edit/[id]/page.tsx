"use client";
import Spinner from "@/components/shared/Spinner";
import {
  useGetEventByIdQuery,
  useUpdateEventByIdMutation,
} from "@/redux/features/events/eventsApiSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

type EventType = {
  title: string;
  description: string;
  images: string[];
};
const EventEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [eventId, setEventId] = useState<null | string>(null);
  const [, setEvent] = useState<null | EventType[]>(null);
  const { data: fetchedEvent, isLoading } = useGetEventByIdQuery(eventId, {
    skip: !eventId,
  });
  const [addUpdateEventData, { isLoading: isUpdatingEvent }] =
    useUpdateEventByIdMutation();

  const { register, handleSubmit, reset } = useForm<EventType>();

  useEffect(() => {
    params.then((res) => {
      setEventId(res.id);
      if (fetchedEvent) {
        setEvent(fetchedEvent);
        reset(fetchedEvent);
      }
    });
  }, [params, reset, fetchedEvent]);

  if (!eventId || isLoading) return <Spinner />;

  const onSubmit = async (data: EventType) => {
    try {
      const response = await addUpdateEventData({
        id: eventId,
        body: { title: data.title, description: data.description },
      }).unwrap();
      if (response) {
        Swal.fire({
          icon: "success",
          text: "Event updated successfully.",
        });
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        text: ex?.data?.message,
      });
    }
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder=""
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered min-h-[300px] w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Images</label>
          <div className="grid max-w-[480px] gap-2 sm:grid-cols-2">
            {fetchedEvent?.images?.map((img: string) => {
              return (
                <div key={img} className="relative">
                  <Image
                    unoptimized
                    key={img}
                    src={img}
                    alt="Event Image"
                    height={100}
                    width={100}
                    className="w-full"
                  />
                  <RxCross1 className="absolute right-0 top-0 bg-black p-1 text-xl text-white" />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdatingEvent}
          className="btn btn-primary mt-10"
        >
          {isUpdatingEvent && <span className="loading loading-spinner"></span>}
          {isUpdatingEvent ? "Submitting..." : "Update Event"}
        </button>
      </form>
    </div>
  );
};

export default EventEditPage;
