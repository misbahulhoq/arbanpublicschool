import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center min-h-screen w-full"
      style={{ backgroundImage: `url("/arban-public-school.jpg")` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative text-center text-white p-4 h-[calc(100vh-64px)] flex items-center justify-center">
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
