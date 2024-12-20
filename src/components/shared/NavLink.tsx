"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface props {
  href: string;
  children: ReactNode;
  className?: string;
}
const NavLink = ({ className, href, children }: props) => {
  const pathName = usePathname();
  return (
    <Link
      href={`${href}`}
      className={`${pathName === href && "font-bold text-primary"} font-medium ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
