"use client";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useGetUserInfoQuery();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore
  const isAdmin = data?.data?.isAdmin;
  if (!data && !isLoading) {
    localStorage.removeItem("authToken");
    redirect("/login");
  }
  if (!isAdmin && !isLoading)
    return (
      <h2 className="text-lg font-bold text-error">Unauthorized Access</h2>
    );
  if (isAdmin && !isLoading) return children;
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="loading loading-spinner"></span>
    </div>
  );
};

export default AdminRoute;
