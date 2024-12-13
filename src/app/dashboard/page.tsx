"use client";

import SideBar from "@/components/dashboard/SideBar";
import React from "react";
import PrivateRoute from "../routes/PrivateRoute";

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <div>
        <div className="sidebar-wrapper pr-5 lg:col-span-3 xl:col-span-2">
          <SideBar />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardPage;
