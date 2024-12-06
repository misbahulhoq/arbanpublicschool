import SideBar from "@/components/dashboard/SideBar";
import React, { ReactNode } from "react";
import TeachersRoute from "@/app/routes/TeachersRoute";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <TeachersRoute>
      <section className="dashboard-page-wrapper grid min-w-fit grid-cols-12 overflow-x-scroll">
        <div className="sidebar-wrapper pr-5 lg:col-span-3 xl:col-span-2">
          <SideBar />
        </div>
        <div className="py-5 pr-5 lg:col-span-9 xl:col-span-10">{children}</div>
      </section>
    </TeachersRoute>
  );
};

export default layout;
