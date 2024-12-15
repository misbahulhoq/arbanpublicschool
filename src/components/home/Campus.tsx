import Image from "next/image";
import React from "react";

const Campus = () => {
  return (
    <section className="">
      <h2 className="mb-4 text-center text-2xl font-bold lg:text-4xl">
        Our Campus
      </h2>
      <div className="overflow-x-auto">
        <Image
          src={`/arban-public-school.jpg`}
          alt="Arban Public School Campus"
          height={500}
          width={800}
          className="h-[350px] w-full min-w-[500px] rounded-md object-cover lg:mx-auto lg:min-h-[600px] lg:w-[93%]"
        />
      </div>
    </section>
  );
};

export default Campus;
