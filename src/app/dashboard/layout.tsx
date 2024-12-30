"use client";
import SideBar from "@/components/dashboard/SideBar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex gap-4 overflow-y-hidden">
      <div className="sidebar-wrapper z-0 lg:fixed">
        <SideBar />
      </div>
      <div className="main-content-wrapper min-h-screen min-w-[600px] flex-grow py-2 lg:ml-60">
        {/* <DashboardNav /> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
