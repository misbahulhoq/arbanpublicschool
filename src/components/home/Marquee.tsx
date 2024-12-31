import Link from "next/link";
import React from "react";

type MarqueeProps = {
  text: string;
  speed?: number; // Speed in seconds
  direction?: "left" | "right"; // Direction of scrolling
};

const Marquee: React.FC<MarqueeProps> = ({
  text,
  speed = 14,
  direction = "left",
}) => {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="sticky top-16 h-8 w-full overflow-hidden">
      <div
        className={`flex w-max whitespace-nowrap ${animationClass}`}
        style={{ animationDuration: `${speed}s`, minWidth: "100vw" }}
      >
        <Link href={`/`} className="mx-4">
          {text}
        </Link>
        <Link href={`/`} className="mx-4">
          {text}
        </Link>{" "}
        <Link href={`/`} className="mx-4">
          {text}
        </Link>{" "}
        <Link href={`/`} className="mx-4">
          {text}
        </Link>
        {/* Duplicate text for seamless looping */}
      </div>
    </div>
  );
};

export default Marquee;
