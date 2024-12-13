import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="container-center py-8">
      <div className="max-w-3xl">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-info">About Us</h1>
          <p className="mt-4">
            Learn more about who we are, what we stand for, and how we create a
            brighter future for our students.
          </p>
        </header>

        {/* Content Section */}
        <div className="space-y-12">
          {/* Mission Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-info">Our Mission</h2>
            <p className="">
              Our mission is to empower students with knowledge, skills, and
              values that prepare them to excel academically and socially in a
              dynamic world. We aim to foster curiosity, creativity, and
              critical thinking.
            </p>
          </section>

          {/* Vision Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-info">Our Vision</h2>
            <p className="">
              We envision a nurturing and inclusive environment where every
              child feels valued and supported. Our goal is to inspire lifelong
              learning and contribute to building a compassionate and innovative
              society.
            </p>
          </section>

          {/* History Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-info">Our History</h2>
            <p className="">
              Arban Public School was founded in 2001 with a dream to provide
              quality education to every child. From a small beginning, we have
              grown into a well-known school, helping students achieve success
              in academics and life. Over the years, we have stayed committed to
              building a strong foundation for learning, growth, and values. Our
              journey is guided by the belief that every child has the potential
              to do great things.
            </p>
          </section>

          {/* Values Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-info">Our Core Values</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong>Excellence:</strong> Striving for the highest standards
                in education and personal development.
              </li>
              <li>
                <strong>Integrity:</strong> Fostering honesty, ethics, and
                accountability in everything we do.
              </li>
              <li>
                <strong>Inclusivity:</strong> Celebrating diversity and ensuring
                equal opportunities for all.
              </li>
              <li>
                <strong>Innovation:</strong> Encouraging creativity and
                embracing technological advancements in education.
              </li>
            </ul>
          </section>
        </div>

        {/* Call to Action Section */}
        {/* <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-blue-600">
            Join Our Community
          </h3>
          <p className="mt-2 text-gray-700">
            Discover the difference we can make together in shaping a brighter
            future for our students.
          </p>
          <button
            className="mt-6 rounded-md bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={() => console.log("Learn More button clicked")}
          >
            Learn More
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AboutUsPage;
