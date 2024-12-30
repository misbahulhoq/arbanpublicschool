import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="ml-auto flex items-center gap-3 lg:ml-1">
      <Image
        src="/arban-public-school-logo.jpg"
        height={25}
        width={40}
        alt="Arban Public School Logo"
        className="h-9 rounded lg:h-auto lg:w-auto"
      />
    </Link>
  );
};

export default Logo;
