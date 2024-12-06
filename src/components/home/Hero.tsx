import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/arban-public-school.jpg")` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex h-[calc(100vh-64px)] items-center justify-center p-4 text-center text-white">
        {/* Your text here */}
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold lg:text-5xl">
            Welcome to{" "}
            <span className="text-teal-400">Arban Public School!</span>
          </h2>
          <p>A place where learning is fun and every child is special.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
