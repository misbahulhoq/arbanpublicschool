import SideBar from "@/components/dashboard/SideBar";
import React, { ReactNode } from "react";
import TeachersRoute from "@/app/routes/TeachersRoute";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <TeachersRoute>
      <section className="dashboard-page-wrapper pointer-events-auto relative flex h-screen grid-cols-12 justify-between gap-2 overflow-auto lg:grid">
        <div className="sidebar-wrapper col-span-3 lg:col-span-3 xl:col-span-2">
          <SideBar />
        </div>
        <div className="col-span-9 min-w-[800px] flex-1 overflow-x-auto overflow-y-auto scroll-smooth py-3 pr-5 lg:col-span-9 xl:col-span-10">
          {children}
        </div>
      </section>
    </TeachersRoute>
  );
};

export default layout;
