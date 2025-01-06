"use client";
import Spinner from "@/components/shared/Spinner";
import { useGetEventByIdQuery } from "@/redux/features/events/eventsApiSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const EventDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [eventId, setEventId] = useState<null | string>(null);
  const { data: event, isLoading: fetchingEvent } = useGetEventByIdQuery(
    eventId,
    { skip: !eventId },
  );

  useEffect(() => {
    params.then((res) => setEventId(res.id));
  }, [params]);

  if (!eventId || fetchingEvent) return <Spinner />;
  const { title, description, images } = event || {};

  return (
    <section className="py-5">
      <div className="container-center">
        <div className="">
          <div className="mx-auto overflow-hidden rounded-lg">
            <div className="">
              <h1 className="mb-4 text-3xl font-bold">{title}</h1>
              <p className="mb-6 text-lg">{description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="h-[400px] w-full overflow-hidden rounded-lg shadow-md"
                >
                  <Image
                    unoptimized
                    src={image}
                    alt={`Event image ${index + 1}`}
                    height={400}
                    width={500}
                    className="h-[400px] w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
