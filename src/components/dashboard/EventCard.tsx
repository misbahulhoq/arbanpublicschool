import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

const EventCard = ({ props }: { props: Props }) => {
  const { _id, title, description, images } = props || {};

  return (
    <div className="transform overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img src={images[0]} alt="" className="h-[250px] w-full object-cover" />
        {/* <Image
          // src={`${images[0]}`}
          // src={images[0]}
          priority
          src={
            "https://i.ibb.co/y52Zqht/117001931-945918015923871-2662978322563336210-n.jpg"
          }
          alt={title}
          height={300}
          width={400}
          className="w-full"
        /> */}

        {/* <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 opacity-0 transition-opacity hover:opacity-100">
          <h2 className="text-center text-xl font-bold">
            {"The big man is on strike"}
          </h2>
        </div> */}
      </div>
      <div className="px-6 pt-3">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        <p className="line-clamp-3">{description} </p>
      </div>

      <div className="flex items-center gap-5 px-6 pb-4 pt-4">
        <Link
          href={`/dashboard/events/edit/${_id}`}
          className="btn btn-outline btn-primary btn-sm"
        >
          Edit
        </Link>

        <Link href={`/events/${_id}`} className="btn btn-primary btn-sm">
          View
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
