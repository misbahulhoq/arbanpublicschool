import DashboardNav from "@/components/dashboard/DashboardNav";
import SideBar from "@/components/dashboard/SideBar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <div className="sidebar-wrapper col-span-3">
        <SideBar />
      </div>
      <div className="main-content-wrapper col-span-9 min-h-screen flex-grow">
        <DashboardNav />
        {children}
      </div>
    </div>
  );
};

export default layout;
