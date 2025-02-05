import Link from "next/link";
import React from "react";
import { FaRobot } from "react-icons/fa";

const ALMHighlight = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="text-center">
        <FaRobot
          size={100}
          className="mx-auto mb-4 animate-bounce text-center"
        />

        <h1 className="mb-4 text-5xl font-bold">Try Out Our AI Model</h1>
        <p className="mb-8 text-xl">
          Experience the power of our cutting-edge AI technology. Ask anything
          and get instant responses!
        </p>
        <Link
          href="/chat-alm"
          className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-500 shadow-lg transition duration-300 hover:bg-gray-200"
        >
          Start Chatting
        </Link>
      </div>
    </div>
  );
};

export default ALMHighlight;
