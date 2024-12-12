import SideBar from "@/components/dashboard/SideBar";
import React, { ReactNode } from "react";
import AdminRoute from "@/app/routes/AdminRoute";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminRoute>
      <section className="dashboard-page-wrapper flex overflow-x-auto lg:grid lg:grid-cols-12">
        <div className="sidebar-wrapper col-span-3 pr-5 xl:col-span-2">
          <SideBar />
        </div>
        <div className="col-span-9 min-w-[800px] py-5 pr-5 xl:col-span-10">
          {children}
        </div>
      </section>
    </AdminRoute>
  );
};

export default layout;
