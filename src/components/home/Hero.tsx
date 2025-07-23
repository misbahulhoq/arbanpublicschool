import Image from "next/image";
import Link from "next/link";
import React from "react";
import Notices from "./Notices";
import { PaintBrushIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
const HeroSection = () => {
  return (
    <section className="">
      <Notices />
      <div className="container-center flex items-center py-10 lg:min-h-[calc(100vh-68px)] lg:py-0">
        <div className="grid flex-grow items-center justify-between gap-10 lg:grid-cols-2 lg:gap-5">
          <div className="left-content space-y-2">
            <h2 className="text-4xl font-extrabold lg:text-5xl">
              Welcome to <br />{" "}
              <span className="text-primary">Arban Public School!</span>
            </h2>
            <p className="pb-5 pt-5">
              A place where learning is fun and every child is special.
            </p>

            <div className="button-wrapper flex items-center gap-6 max-[420px]:flex-col max-[420px]:items-start">
              <Link
                href={`/contact`}
                className="btn btn-outline btn-primary w-40 rounded-full"
              >
                Contact Us
              </Link>
              <Link
                href={`/about`}
                className="btn btn-primary w-40 rounded-full"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* --- Right Side (New Design) --- */}
          <div className="relative h-full min-h-[400px] w-full overflow-hidden lg:overflow-visible">
            {/* Decorative Background Blobs */}
            <div
              aria-hidden="true"
              className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-secondary opacity-20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -left-10 bottom-10 h-72 w-72 rounded-full bg-accent opacity-20 blur-3xl"
            />

            {/* Main Image Container */}
            <div className="relative h-full w-full rounded-3xl shadow-xl">
              <Image
                src="/illustrators/Placeholder.svg"
                alt="A happy child painting at a kindergarten"
                height={400}
                width={300}
                className="mx-auto rounded-3xl object-cover"
                priority
              />

              {/* Floating Feature Card 1: Creative Learning */}
              <div className="absolute left-4 top-4 rounded-full bg-base-100/70 p-3 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-content">
                    <PaintBrushIcon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold text-base-content">
                    Creative Learning
                  </span>
                </div>
              </div>

              {/* Floating Feature Card 2: Safe Environment */}
              <div className="absolute bottom-4 right-4 rounded-full bg-base-100/70 p-3 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-content">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold text-base-content">
                    Safe Environment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
