"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  iconClassName?: string;
  href: string;
  className?: string;
}
const DashboardLink = ({ props }: { props: Props }) => {
  const pathName = usePathname();
  const { children, href, icon, iconClassName } = props;
  return (
    <Link
      href={`${href}`}
      className={`flex items-center gap-3 ${pathName === href && "active"}`}
    >
      <span className={`${iconClassName ? iconClassName : "text-xl"}`}>
        {" "}
        {icon}{" "}
      </span>{" "}
      {children}
    </Link>
  );
};

export default DashboardLink;
