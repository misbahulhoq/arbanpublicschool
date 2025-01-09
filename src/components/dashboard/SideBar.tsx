"use client";
import React from "react";
import DashboardLink from "./DashboardLink";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import Logo from "../shared/Logo";
import {
  PiChalkboardTeacher,
  PiStudent,
  PiTarget,
  PiUsers,
} from "react-icons/pi";
import { MdInsertChartOutlined, MdOutlineEventAvailable } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GoIssueReopened } from "react-icons/go";

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
                icon: <PiStudent className="text-xl" />,
                children: "Students",
              }}
            ></DashboardLink>
          </li>
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/addstudent",
                children: "Add Student",
                icon: <IoPersonAddOutline className="text-xl" />,
              }}
            ></DashboardLink>
          </li>
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/addnumber",
                children: "Add Number",
                icon: <MdInsertChartOutlined className="text-xl" />,
              }}
            ></DashboardLink>
          </li>
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/numbers",
                children: "Numbers",
                icon: <TfiStatsUp className="text-lg" />,
              }}
            ></DashboardLink>
          </li>
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/results",
                children: "Results",
                icon: <PiTarget className="text-xl" />,
              }}
            ></DashboardLink>
          </li>
          <li className={`${isAdmin ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/teachers",
                children: "Teachers",
                icon: <PiChalkboardTeacher />,
              }}
            ></DashboardLink>
          </li>
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/events",
                children: "Events",
                icon: <MdOutlineEventAvailable />,
              }}
            ></DashboardLink>
          </li>
          <li className={`${isAdmin ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/users",
                children: "Users",
                icon: <PiUsers />,
              }}
            ></DashboardLink>
          </li>
          <li className={`${isAdmin ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/notices",
                children: "Notices",
                icon: <IoIosNotificationsOutline />,
              }}
            ></DashboardLink>
          </li>
          <li className={`${isTeacher ? "block" : "hidden"}`}>
            <DashboardLink
              props={{
                href: "/dashboard/issues",
                children: "Issues",
                icon: <GoIssueReopened />,
              }}
            ></DashboardLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
