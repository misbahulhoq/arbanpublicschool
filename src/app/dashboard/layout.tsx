import SideBar from "@/components/dashboard/SideBar";
import React, { ReactNode } from "react";
import PrivateRoute from "../routes/PrivateRoute";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <PrivateRoute>
      <section className="dashboard-page-wrapper grid grid-cols-12 overflow-x-scroll min-w-fit">
        <div className="sidebar-wrapper lg:col-span-3 xl:col-span-2 pr-5">
          <SideBar />
        </div>
        <div className="lg:col-span-9 xl:col-span-10 py-5 pr-5">{children}</div>
      </section>
    </PrivateRoute>
  );
};

export default layout;
