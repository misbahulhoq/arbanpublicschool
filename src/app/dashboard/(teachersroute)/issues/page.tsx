"use client";
import IssueCard from "@/components/dashboard/IssueCard";
import { useGetIssuesDataQuery } from "@/redux/features/issues/issuesApi";
import React from "react";
type IssueType = {
  _id: string;
  submittedBy: string;
  subject?: string;
  issue: string;
  priority: "low" | "medium" | "high";
  status: "open" | "pending" | "closed";
};
const DashboardIssuesPage = () => {
  const { data: issues, isLoading } = useGetIssuesDataQuery();
  if (isLoading) return <span className="loading loading-spinner"></span>;
  console.log(issues);
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.isArray(issues) &&
        issues?.map((issue: IssueType) => (
          <IssueCard key={issue._id} {...issue} />
        ))}
    </div>
  );
};

export default DashboardIssuesPage;
