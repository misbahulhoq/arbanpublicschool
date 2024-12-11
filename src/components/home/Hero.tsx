import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="container-center flex items-center py-10 lg:min-h-[calc(100vh-68px)] lg:py-0">
      <div className="grid flex-grow items-center justify-between gap-10 lg:grid-cols-2 lg:gap-5">
        <div className="left-content space-y-2">
          <h2 className="text-4xl font-extrabold lg:text-5xl">
            Welcome to <br />{" "}
            <span className="text-accent">Arban Public School!</span>
          </h2>
          <p className="pb-5 pt-5">
            A place where learning is fun and every child is special.
          </p>

          <div className="button-wrapper flex items-center gap-6 max-[420px]:flex-col max-[420px]:items-start">
            <button className="btn btn-outline btn-primary w-40 rounded-full">
              Contact Us
            </button>
            <button className="btn btn-primary w-40 rounded-full">
              About Us
            </button>
          </div>
        </div>

        <div className="right-content img-wrapper relative justify-self-end">
          <div className="absolute bottom-[80px] z-[1] max-[415px]:bottom-[50px]">
            <Image
              src={`/illustrators/hero-vector.svg`}
              alt=""
              height={200}
              width={500}
              className=""
            />
          </div>
          <div className="relative z-[2]">
            <Image
              src={`/illustrators/Placeholder.svg`}
              alt=""
              height={200}
              width={500}
              className=""
            />
          </div>
          {/* <Image
            // src={`/illustrators/students.png`}
            src={`/illustrators/hero.webp`}
            alt="Arban Public Schools Students Illustration"
            height={100}
            width={500}
            className="h-[500px] w-full rounded-lg object-cover"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
