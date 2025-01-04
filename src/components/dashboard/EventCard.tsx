import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventCard = () => {
  //   const { title, description, imageUrl } = event;

  return (
    <div className="transform overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <Image
          src={`/notice.jpg`}
          alt=""
          height={300}
          width={400}
          className="w-full"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 opacity-0 transition-opacity hover:opacity-100">
          <h2 className="text-center text-xl font-bold">
            {"The big man is on strike"}
          </h2>
        </div>
      </div>
      <div className="p-6">
        <p className="line-clamp-3">
          {
            "description will go here lorem imasdjflkasjl;pkasdjf the big man is on strike"
          }{" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut officia
          expedita et reiciendis nesciunt ex quos accusamus omnis maiores saepe,
          beatae numquam nihil, magni eos neque nobis. Cupiditate, reiciendis
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
          similique quae, doloribus exercitationem rerum quidem voluptatibus
          veritatis cumque itaque alias soluta dolorum neque molestias nisi
          libero! Libero vitae numquam ducimus. id?
        </p>
      </div>
      <div className="flex items-center gap-5 px-6 pb-4">
        <Link href={``} className="btn btn-outline btn-primary btn-sm">
          Edit
        </Link>
        <Link href={``} className="btn btn-primary btn-sm">
          View
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
