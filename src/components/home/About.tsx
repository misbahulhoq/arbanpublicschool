// import React from "react";

// const About = () => {
//   return (
//     <section className="bg-base-200 py-12 lg:py-16">
//       <div className="container-center">
//         <h2 className="mb-5 text-center text-2xl font-bold lg:text-4xl">
//           About Us
//         </h2>
//         <div className="mx-auto max-w-[800px] space-y-2">
//           <p className="text-justify">
//             Welcome to{" "}
//             <span className="font-semibold text-primary opacity-100">
//               Arban Public School
//             </span>
//             , your trusted place for quality education since 2001. For over 20
//             years, we have been helping students grow into confident,
//             knowledgeable, and responsible individuals.
//           </p>

//           <p className="text-justify">
//             At{" "}
//             <span className="font-semibold text-primary opacity-100">
//               {" "}
//               Arban Public School
//             </span>
//             , we focus on creating a friendly and supportive environment where
//             every student can learn and thrive. Our dedicated teachers use
//             modern teaching methods to make learning fun and meaningful. Along
//             with academics, we help students develop important life skills and
//             strong values.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;

import {
  BookOpenIcon,
  HeartIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

const AboutSection = () => {
  return (
    <section className="bg-base-100 py-16 lg:py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-primary lg:text-5xl">
            Nurturing Lifelong Learners
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-base-content/80">
            Since 2001, Arban Public School has been a place where young minds
            blossom in a caring and creative environment.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left Column: Welcome Text (takes more space now) */}
          <div className="space-y-6 lg:col-span-3">
            <h3 className="text-3xl font-bold text-base-content">
              Welcome to Our School
            </h3>
            <p className="text-base leading-relaxed text-base-content/80">
              For over two decades, we have been dedicated to helping students
              grow into confident, knowledgeable, and responsible individuals.
              Our legacy is built on a deep commitment to quality education and
              the holistic development of every child.
            </p>
            <p className="text-base leading-relaxed text-base-content/80">
              We believe that a supportive and friendly environment is key to a
              child&apos;s success. At Arban, every student is seen, heard, and
              encouraged to explore their full potential.
            </p>
          </div>

          {/* Right Column: Info Cards with Timeline */}
          <div className="relative mt-6 lg:col-span-2 lg:mt-0">
            {/* The Timeline connecting line */}
            <div
              aria-hidden="true"
              className="absolute left-9 top-0 h-full w-0.5 bg-base-300"
            />

            <div className="space-y-12">
              {/* Card 1: Our Story */}
              <div className="relative pl-20 transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute left-0 top-0 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary text-primary-content ring-8 ring-base-100">
                  <BookOpenIcon className="h-9 w-9" />
                </div>
                <div className="rounded-xl bg-base-200 p-6 shadow-md transition-shadow hover:shadow-xl">
                  <h4 className="mb-2 text-xl font-bold text-primary">
                    Our Story
                  </h4>
                  <p className="text-sm text-base-content/70">
                    Founded in 2001, our school was born from a desire to create
                    a truly child-centric learning space.
                  </p>
                </div>
              </div>

              {/* Card 2: Our Mission */}
              <div className="relative pl-20 transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute left-0 top-0 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-secondary text-secondary-content ring-8 ring-base-100">
                  <HeartIcon className="h-9 w-9" />
                </div>
                <div className="rounded-xl bg-base-200 p-6 shadow-md transition-shadow hover:shadow-xl">
                  <h4 className="mb-2 text-xl font-bold text-secondary">
                    Our Mission
                  </h4>
                  <p className="text-sm text-base-content/70">
                    To provide a safe, inclusive, and stimulating environment
                    that fosters a love for learning.
                  </p>
                </div>
              </div>

              {/* Card 3: Our Approach */}
              <div className="relative pl-20 transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute left-0 top-0 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent text-accent-content ring-8 ring-base-100">
                  <LightBulbIcon className="h-9 w-9" />
                </div>
                <div className="rounded-xl bg-base-200 p-6 shadow-md transition-shadow hover:shadow-xl">
                  <h4 className="mb-2 text-xl font-bold text-accent">
                    Our Approach
                  </h4>
                  <p className="text-sm text-base-content/70">
                    We blend modern teaching methods with play-based activities
                    to make learning fun and effective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
