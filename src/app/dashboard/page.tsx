"use client";

import SideBar from "@/components/dashboard/SideBar";
import React from "react";
import PrivateRoute from "../routes/PrivateRoute";

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <div>
        <div className="sidebar-wrapper lg:col-span-3 xl:col-span-2 pr-5">
          <SideBar />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardPage;
