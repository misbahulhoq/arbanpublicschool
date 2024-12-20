"use client";
import { useDeleteIssueMutation } from "@/redux/features/issues/issuesApi";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

interface IssueCardProps {
  _id: string;
  submittedBy: string;
  subject?: string;
  issue: string;
  priority: "low" | "medium" | "high";
  status: "open" | "pending" | "closed";
}

const priorityColors = {
  low: "badge-neutral",
  medium: "badge-warning",
  high: "badge-error",
};

const statusColors = {
  open: "badge-primary",
  pending: "badge-secondary",
  closed: "badge-neutral",
};

const IssueCard: React.FC<IssueCardProps> = ({
  _id,
  submittedBy,
  subject,
  issue,
  priority,
  status,
}) => {
  const [deleteIssueById, { isLoading }] = useDeleteIssueMutation();
  const handleDelete = async (_id: string) => {
    // console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteIssueById(_id).unwrap();
          console.log(response);
          if (response.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Issue has been deleted.",
              icon: "success",
            });
          }
        } catch (ex) {
          console.log(ex);
          Swal.fire({
            icon: "error",
            title: "OOPS!",
            text: ex.message,
          });
        }
      }
    });
  };
  return (
    <div className="max-w-sm rounded-lg border border-base-200 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <span className={`badge ${priorityColors[priority]}`}>
          {priority.toUpperCase()}
        </span>
        <span className={`badge ${statusColors[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold">
        {subject || "No Subject Provided"}
      </h3>
      <p className="mt-2 text-sm">{issue}</p>
      <div className="mt-4">
        <p className="text-xs">Submitted By:</p>
        <p className="text-sm font-medium text-gray-900">{submittedBy}</p>
      </div>
      <div className="mt-3 flex justify-end gap-4">
        <MdEdit className="cursor-pointer text-2xl text-primary" />
        <MdDelete
          className="cursor-pointer text-2xl text-error"
          onClick={() => handleDelete(_id)}
        />
      </div>
    </div>
  );
};

export default IssueCard;
