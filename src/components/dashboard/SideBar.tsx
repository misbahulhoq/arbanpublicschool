import React from "react";
import DashboardLink from "./DashboardLink";

const SideBar = () => {
  return (
    <div className="">
      <ul className="menu h-screen bg-base-200 w-56">
        <li>
          <DashboardLink
            props={{ href: "/dashboard/allstudents", children: "All Students" }}
          ></DashboardLink>
        </li>
        <li>
          <DashboardLink
            props={{ href: "/dashboard/addstudent", children: "Add Student" }}
          ></DashboardLink>
        </li>
        <li>
          <DashboardLink
            props={{ href: "/dashboard/addnumber", children: "Add Number" }}
          ></DashboardLink>
        </li>
        <li>
          <DashboardLink
            props={{ href: "/dashboard/allnumbers", children: "All Numbers" }}
          ></DashboardLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
