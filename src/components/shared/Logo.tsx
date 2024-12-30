import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="">
      <Image
        src="/arban-public-school-logo.jpg"
        height={25}
        width={35}
        alt="Arban Public School Logo"
        className="rounded"
      />
    </Link>
  );
};

export default Logo;
