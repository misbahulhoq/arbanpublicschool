"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
  className?: string;
}
const DashboardLink = ({ props }: { props: Props }) => {
  const pathName = usePathname();
  const { children, href } = props;
  return (
    <Link href={`${href}`} className={`${pathName === href && "active"}`}>
      {children}
    </Link>
  );
};

export default DashboardLink;
