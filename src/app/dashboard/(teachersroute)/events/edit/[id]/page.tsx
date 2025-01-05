"use client";
import Spinner from "@/components/shared/Spinner";
import React, { useEffect, useState } from "react";

const EventEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [eventId, setEventId] = useState<null | string>(null);

  useEffect(() => {
    params.then((res) => {
      setEventId(res.id);
    });
  }, [params]);

  if (!eventId) return <Spinner />;

  return <div>{eventId}</div>;
};

export default EventEditPage;
