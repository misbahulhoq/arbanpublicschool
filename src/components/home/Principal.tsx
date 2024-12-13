import React from "react";

const PrincipalsMessage = () => {
  return (
    <section className="container-center">
      <div className="mx-auto">
        <h2 className="mb-6 text-center text-2xl font-bold lg:text-4xl">
          Principal&apos;s message
        </h2>
        <div className="grid flex-col items-center gap-6 lg:grid-cols-12">
          <div className="img-wrapper flex justify-center lg:col-span-4">
            <img
              src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
              alt=""
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>

          <div className="message-wrapper space-y-2 lg:col-span-8 lg:max-w-screen-md">
            <h4 className="font-semibold">Welcome to Arban Public School!</h4>
            <p className="">
              Since our establishment in 2001, we have been committed to
              providing a nurturing and dynamic learning environment where every
              child can thrive. Our goal is to help students grow academically,
              socially, and emotionally, preparing them for a bright future.
              Thank you for being part of our journey. Together, let&apos;s
              create a brighter future for our children.
            </p>{" "}
            <p>
              At Arban Public School, we focus not only on academic excellence
              but also on building strong values like respect, integrity, and
              teamwork. With the support of our dedicated teachers and modern
              facilities, we strive to make learning exciting and meaningful for
              every student.
            </p>
            <p>
              Thank you for being part of our journey. Together, let&apos;s
              create a brighter future for our children.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalsMessage;
