"use client";
import { useGetIssuesDataQuery } from "@/redux/features/issues/issuesApi";
import React from "react";

const DashboardIssuesPage = () => {
  const { data, isLoading } = useGetIssuesDataQuery();
  if (isLoading) return <span className="loading loading-spinner"></span>;
  return <div>DashboardIssuesPage</div>;
};

export default DashboardIssuesPage;
