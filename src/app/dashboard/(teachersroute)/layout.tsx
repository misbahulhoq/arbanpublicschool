"use client";
// import SideBar from "@/components/dashboard/SideBar";
import React, { ReactNode } from "react";
import TeachersRoute from "@/app/routes/TeachersRoute";

const Layout = ({ children }: { children: ReactNode }) => {
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // });
  return (
    <TeachersRoute>
      <section className="dashboard-page-wrapper pointer-events-auto relative">
        {/* <div className="sidebar-wrapper col-span-3 min-w-fit overflow-y-auto lg:col-span-3 xl:col-span-2">
          <SideBar />
        </div> */}
        <div className="col-span-9 min-w-[800px] flex-1 overflow-x-auto overflow-y-auto scroll-smooth py-3 pb-28 pr-5 lg:col-span-9 xl:col-span-10 xl:min-w-fit xl:pl-5">
          {children}
        </div>
      </section>
    </TeachersRoute>
  );
};

export default Layout;
