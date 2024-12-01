import SideBar from "@/components/dashboard/SideBar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="dashboard-page-wrapper grid grid-cols-12 overflow-x-scroll min-w-fit">
      <div className="sidebar-wrapper col-span-4">
        <SideBar />
      </div>
      <div className="col-span-8">{children}</div>
    </section>
  );
};

export default layout;
