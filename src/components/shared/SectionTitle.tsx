import React from "react";

const SectionTitle = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  return (
    <h2 className={`text-center text-3xl font-bold lg:text-4xl ${className}`}>
      {text}
    </h2>
  );
};

export default SectionTitle;
