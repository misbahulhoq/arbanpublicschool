import React, { ReactNode } from "react";
import AdminRoute from "@/app/routes/AdminRoute";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminRoute>
      <section className="dashboard-page-wrapper overflow-x-auto">
        <div className="min-w-[800px] py-5 pr-5">{children}</div>
      </section>
    </AdminRoute>
  );
};

export default Layout;
