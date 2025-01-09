import Link from "next/link";
import React from "react";

type MarqueeProps = {
  text: string;
  id: string;
  speed?: number; // Speed in seconds
  direction?: "left" | "right"; // Direction of scrolling
};

const Marquee: React.FC<MarqueeProps> = ({
  text,
  id,
  speed = 14,
  direction = "left",
}) => {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="sticky top-16 flex h-10 w-full items-center overflow-hidden">
      <div
        className={`whitespace-nowrap flex w-max ${animationClass}`}
        style={{ animationDuration: `${speed}s`, minWidth: "90vw" }}
      >
        <Link href={`/notices/${id}`} className="mx-4">
          {text}
        </Link>
        <Link href={`/notices/${id}`} className="mx-4">
          {text}
        </Link>
        {/* Duplicate text for seamless looping */}
      </div>
    </div>
  );
};

export default Marquee;
