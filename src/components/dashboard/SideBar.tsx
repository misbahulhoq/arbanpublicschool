"use client";
import React from "react";
import DashboardLink from "./DashboardLink";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import Logo from "../shared/Logo";

const SideBar = () => {
  const { data, isLoading } = useGetUserInfoQuery();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isTeacher = data?.data?.role === "teacher";
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isAdmin = data?.data?.isAdmin;
  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="h-screen overflow-y-auto bg-base-200 py-5">
      <div className="">
        <div className="logo-wrapper mb-4 flex w-full items-center justify-between px-5">
          <Logo />
        </div>

        <ul className="menu sticky left-0 top-0 w-56 overflow-y-auto scroll-smooth bg-base-200">
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/allstudents",
                children: "All Students",
              }}
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
              props={{ href: "/dashboard/numbers", children: "Numbers" }}
            ></DashboardLink>
          </li>
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{ href: "/dashboard/results", children: "Results" }}
            ></DashboardLink>
          </li>
          <li className={`${isAdmin ? "block" : "hidden"}`}>
            <DashboardLink
              props={{ href: "/dashboard/teachers", children: "Teachers" }}
            ></DashboardLink>
          </li>
          <li className={`${isAdmin ? "block" : "hidden"}`}>
            <DashboardLink
              props={{ href: "/dashboard/users", children: "Users" }}
            ></DashboardLink>
          </li>
          <li className={`${isAdmin ? "block" : "hidden"}`}>
            <DashboardLink
              props={{ href: "/dashboard/notices", children: "Notices" }}
            ></DashboardLink>
          </li>
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{ href: "/dashboard/issues", children: "Issues" }}
            ></DashboardLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
