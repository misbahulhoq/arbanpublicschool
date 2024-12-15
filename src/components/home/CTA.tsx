import React from "react";
import SectionTitle from "../shared/SectionTitle";
import Link from "next/link";

const CallToAction: React.FC = () => {
  return (
    <section className="select-none bg-neutral py-12 text-neutral-content lg:py-16">
      <div className="container-center">
        <div className="mx-auto max-w-xl">
          <SectionTitle text="Join Arban Public School Today!" />
          <p className="mb-6 mt-5">
            Discover a world of learning and opportunities at Arban Public
            School. Enroll your child now for a brighter future!
          </p>
          <Link href="/admissions" className="btn btn-primary">
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
