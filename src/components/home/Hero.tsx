import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="container-center flex min-h-screen items-center">
      <div className="h-14 w-12 bg-primary"></div>
      <div className="grid items-center gap-5 lg:grid-cols-2">
        <div className="left-content space-y-2">
          <h2 className="text-4xl font-extrabold lg:text-5xl">
            Welcome to{" "}
            <span className="text-teal-400">Arban Public School!</span>
          </h2>
          <p>A place where learning is fun and every child is special.</p>
        </div>

        <div className="right-content img-wrapper">
          <Image
            // src={`/illustrators/students.png`}
            src={`/illustrators/hero.webp`}
            alt="Arban Public Schools Students Illustration"
            height={100}
            width={500}
            className="h-[500px] w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
