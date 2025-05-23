"use client";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useGetUserInfoQuery();

  if (!isLoading && !data) {
    localStorage.removeItem("authToken");
    redirect("/login");
  }
  if (!isLoading && data) return children;
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="loading loading-spinner"></span>
    </div>
  );
};

export default PrivateRoute;
