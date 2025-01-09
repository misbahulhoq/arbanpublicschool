"use client";
import React from "react";
import PrivateRoute from "../routes/PrivateRoute";
export const imgbbApiKey = process.env.IMGBB_API_KEY;

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <div className="h-screen">
        <div className="sidebar-wrapper pr-5 lg:col-span-3 xl:col-span-2">
          {/* <SideBar /> */}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardPage;
