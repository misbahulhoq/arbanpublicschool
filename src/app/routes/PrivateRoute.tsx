"use client";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useGetUserInfoQuery();

  console.log(data);
  if (!isLoading && !data) {
    localStorage.removeItem("authToken");
    redirect("/login");
  }
  if (!isLoading && data) return children;
  return null;
};

export default PrivateRoute;
