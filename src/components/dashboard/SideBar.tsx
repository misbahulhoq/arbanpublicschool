"use client";
import React from "react";
import DashboardLink from "./DashboardLink";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";

const SideBar = () => {
  const { data, isLoading } = useGetUserInfoQuery();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isTeacher = data?.data?.role === "teacher";
  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="">
      <ul className="menu h-screen bg-base-200 w-56">
        <li className={`${isTeacher ? "block" : "hidden"}`}>
          <DashboardLink
            props={{ href: "/dashboard/allstudents", children: "All Students" }}
          ></DashboardLink>
        </li>
        <li className={`${isTeacher ? "block" : "hidden"}`}>
          <DashboardLink
            props={{ href: "/dashboard/addstudent", children: "Add Student" }}
          ></DashboardLink>
        </li>
        <li className={`${isTeacher ? "block" : "hidden"}`}>
          <DashboardLink
            props={{ href: "/dashboard/addnumber", children: "Add Number" }}
          ></DashboardLink>
        </li>
        <li className={`${isTeacher ? "block" : "hidden"}`}>
          <DashboardLink
            props={{ href: "/dashboard/allnumbers", children: "All Numbers" }}
          ></DashboardLink>
        </li>
        <li className={`${isTeacher ? "block" : "hidden"}`}>
          <DashboardLink
            props={{ href: "/dashboard/results", children: "Results" }}
          ></DashboardLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
