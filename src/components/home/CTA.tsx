// import React from "react";
// import Link from "next/link";

// const CallToAction: React.FC = () => {
//   return (
//     <section className="select-none bg-neutral py-12 text-neutral-content lg:py-16">
//       <div className="container-center">
//         <div className="mx-auto max-w-[800px]">
//           <h2 className="text-3xl font-bold lg:text-4xl">
//             Join Arban Public School Today!
//           </h2>
//           <p className="mb-6 mt-5">
//             Discover a world of learning and opportunities at Arban Public
//             School. <br /> Enroll your child now for a brighter future!
//           </p>
//           <Link href="/admissions" className="btn btn-primary">
//             Apply Now
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CallToAction;

import Link from "next/link";
import {
  PaintBrushIcon,
  BookOpenIcon,
  CubeTransparentIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const JoinNowSection = () => {
  return (
    <section className="relative overflow-hidden bg-base-100 py-20 md:py-28">
      {/* Decorative Background Shapes - Now using theme colors and opacity utilities */}
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-full">
        <div className="animate-blob absolute -left-24 -top-32 h-96 w-96 rounded-full bg-primary opacity-20 blur-3xl"></div>
        <div className="animate-blob animation-delay-4000 absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-secondary opacity-20 blur-3xl"></div>
      </div>

      <div className="container-center relative z-10">
        {/* Card now uses bg-base-200 for proper theming */}
        <div className="rounded-2xl bg-base-200 p-8 text-center shadow-xl md:p-12">
          {/* Illustrative Icons - Now using fully opaque theme colors */}
          <div className="mb-8 flex justify-center gap-8 md:gap-12">
            <div className="rounded-full bg-secondary p-4 text-secondary-content transition-transform hover:scale-110">
              <PaintBrushIcon className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <div className="rounded-full bg-primary p-4 text-primary-content transition-transform hover:scale-110">
              <BookOpenIcon className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <div className="rounded-full bg-secondary p-4 text-secondary-content transition-transform hover:scale-110">
              <CubeTransparentIcon className="h-8 w-8 md:h-10 md:w-10" />
            </div>
          </div>

          {/* Text Content - No changes needed here, already using theme colors */}
          <h2 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
            Join Arban Public School Today!
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-base-content">
            Discover a world of learning and opportunities. <br /> Enroll your
            child now for a brighter, more creative future!
          </p>

          {/* Call-to-Action Buttons - Updated with DaisyUI btn classes */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/admissions"
              className="group btn btn-accent rounded-full" // Use DaisyUI classes
            >
              Apply Now
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinNowSection;
