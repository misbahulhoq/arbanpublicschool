"use client";
import { useGetUserInfoQuery } from "@/redux/features/auth/authApi";
import React from "react";
let isAuthenticated = false;
const DashboardPage = () => {
  const { data, isLoading } = useGetUserInfoQuery();
  if (!isLoading && data) {
    isAuthenticated = true;
  }
  return <div>DashboardPage</div>;
};

export { isAuthenticated };

export default DashboardPage;
