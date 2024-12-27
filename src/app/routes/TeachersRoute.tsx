"use client";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";

import React, { ReactNode } from "react";

const TeachersRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useGetUserInfoQuery();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isTeacher = data?.data?.role === "teacher";
  if (!data && !isLoading) {
    localStorage.removeItem("authToken");
    redirect("/login");
  }
  if (!isTeacher && !isLoading)
    return (
      <div className="">
        <h2 className="text-error">Unauthorized access</h2>
      </div>
    );
  if (isTeacher && !isLoading) return children;
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="loading loading-spinner"></span>
    </div>
  );
};

export default TeachersRoute;
