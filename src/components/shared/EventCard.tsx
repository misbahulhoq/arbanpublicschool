import Image from "next/image";
import React from "react";

const EventCard = () => {
  return (
    <div className="overflow-hidden rounded-md border max-[640px]:mx-auto max-[640px]:max-w-[280px]">
      <div className="img-wrapper">
        <Image
          src={`/illustrators/students.png`}
          alt=""
          height={100}
          width={150}
          className="h-[130px] w-full object-cover"
        />
      </div>
      <div className="content-wrapper space-y-2 px-3 py-3">
        <h3 className="font-semibold">Prize giving ceremony</h3>
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
          tenetur non quisquam
        </p>
        <button className="btn btn-outline btn-primary btn-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
