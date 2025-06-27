import Link from "next/link";
import React from "react";
import {
  SparklesIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { LinkIcon } from "@heroicons/react/20/solid";

const ALMHighlight = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-primary to-rose-300 py-20">
      <div className="absolute inset-0 opacity-10">
        {/* Decorative background shapes */}
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white mix-blend-overlay blur-xl filter"></div>
        <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-white mix-blend-overlay blur-2xl filter"></div>
      </div>

      <div className="container relative mx-auto px-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <SparklesIcon className="h-8 w-8 text-white" />
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Have Questions? Get Instant Answers!
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
          Try our new AI Assistant, designed to help you with admissions,
          curriculum details, school timings, and any other questions you might
          have, 24/7.
        </p>

        <Link
          href={"/apollochat"}
          className="inline-flex transform items-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-bold text-accent-content shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          Start Chatting Now
        </Link>
      </div>
    </section>
  );
};

export default ALMHighlight;
