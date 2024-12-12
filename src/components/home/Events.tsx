import React from "react";
import EventCard from "../shared/EventCard";

const Events = () => {
  return (
    <section className="container-center">
      <h2 className="mb-4 text-center text-2xl font-bold lg:text-4xl">
        Events
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <EventCard />
      </div>
    </section>
  );
};

export default Events;
