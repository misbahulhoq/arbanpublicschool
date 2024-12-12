import React from "react";

const About = () => {
  return (
    <section className="bg-base-200 py-10">
      <div className="container-center">
        <h2 className="mb-5 text-center text-2xl font-bold lg:text-4xl">
          About Us
        </h2>
        <div className="mx-auto max-w-[900px] space-y-2">
          <p className="text-justify">
            Welcome to{" "}
            <span className="font-semibold text-primary opacity-100">
              Arban Public School
            </span>
            , your trusted place for quality education since 2001. For over 20
            years, we have been helping students grow into confident,
            knowledgeable, and responsible individuals.
          </p>

          <p className="text-justify">
            At{" "}
            <span className="font-semibold text-primary opacity-100">
              {" "}
              Arban Public School
            </span>
            , we focus on creating a friendly and supportive environment where
            every student can learn and thrive. Our dedicated teachers use
            modern teaching methods to make learning fun and meaningful. Along
            with academics, we help students develop important life skills and
            strong values.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
