"use client";
import {
  useDeleteIssueMutation,
  useGetIssuesDataQuery,
  useUpdateIssueMutation,
} from "@/redux/features/issues/issuesApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

type IssueType = {
  _id: string;
  submittedBy: string;
  subject?: string;
  issue: string;
  priority: "low" | "medium" | "high";
  status: "open" | "pending" | "closed";
};

export type FormData = {
  submittedBy: string;
  subject?: string;
  issue: string;
  priority: "low" | "medium" | "high";
  status: "open" | "pending" | "closed";
};

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

const DashboardIssuesPage = () => {
  const { data: issues, isLoading } = useGetIssuesDataQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [updateIssueInfo, setIssueInfo] = useState<IssueType | null>(null);
  const [addIssueUpdateData, { isLoading: isUpdating }] =
    useUpdateIssueMutation();
  const [deleteIssueById] = useDeleteIssueMutation();
  if (isLoading) return <span className="loading loading-spinner"></span>;

  const handleDelete = async (_id: string) => {
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
          if (response.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Issue has been deleted.",
              icon: "success",
            });
          }
        } catch (ex) {
          console.log(ex);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Swal.fire({
            icon: "error",
            title: "OOPS!",
            text: ex,
          });
        }
      }
    });
  };

  const onIssueUpdate = async (data: FormData) => {
    await addIssueUpdateData({
      id: updateIssueInfo?._id as string,
      body: data,
    })
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Updated successfully.",
        });
      })
      .catch(() => {});
  };

  return (
    <section>
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.isArray(issues) && !issues.length && (
          <h3 className="text-lg font-semibold">No Issues found</h3>
        )}
        {Array.isArray(issues) &&
          issues?.map((Issue: IssueType) => {
            const { _id, priority, status, subject, submittedBy, issue } =
              Issue;
            return (
              <div
                key={Issue._id}
                className="max-w-sm rounded-lg border border-base-200 p-4 shadow-md"
              >
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
                  <p className="text-sm font-medium text-gray-900">
                    {submittedBy}
                  </p>
                </div>
                <div className="mt-3 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIssueInfo(Issue);
                      reset(Issue);
                      document
                        .getElementById("issue_update_modal")
                        ?.classList.add("modal-open");
                    }}
                  >
                    <MdEdit className="cursor-pointer text-2xl text-primary" />
                  </button>

                  <MdDelete
                    className="cursor-pointer text-2xl text-error"
                    onClick={() => handleDelete(_id)}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* update modal */}
      <dialog id="issue_update_modal" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onIssueUpdate)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium">
                Your Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                {...register("submittedBy", {
                  required: "Name is required",
                })}
                className={`input input-bordered w-full ${
                  errors.submittedBy && "border-error"
                }`}
              />
              {errors.submittedBy && (
                <p className="mt-1 text-sm text-error">
                  {errors.submittedBy.message}
                </p>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                {...register("subject")}
                className={`input input-bordered w-full`}
              />
            </div>

            {/* Issue Description Field */}
            <div>
              <label htmlFor="issue" className="block text-sm font-medium">
                Issue Description <span className="text-error">*</span>
              </label>
              <textarea
                id="issue"
                rows={4}
                {...register("issue", {
                  required: "Issue description is required",
                })}
                className={`textarea textarea-bordered mt-1 w-full ${
                  errors.issue ? "border-error" : "border-gray-300"
                }`}
              ></textarea>
              {errors.issue && (
                <p className="mt-1 text-sm text-error">
                  {errors.issue.message}
                </p>
              )}
            </div>

            {/* Priority Select Field */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium">
                Priority
              </label>
              <select
                id="priority"
                {...register("priority", {
                  required: "Priority is required",
                })}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.priority ? "border-error" : "border-gray-300"
                }`}
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-error">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* Status Select Field */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                {...register("status", {
                  required: "Status is required",
                })}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.priority ? "border-error" : "border-gray-300"
                }`}
              >
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-error">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={isUpdating}
              className="btn btn-primary btn-block sm:btn-wide"
            >
              {isUpdating && <span className="loading loading-spinner"></span>}
              {isUpdating ? "Updating.." : "Update Issue"}
            </button>
          </form>

          {/* if there is a button in form, it will close the modal */}
          <div className="flex justify-end">
            <button
              className="btn"
              onClick={() => {
                document
                  .getElementById("issue_update_modal")
                  ?.classList.remove("modal-open");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default DashboardIssuesPage;
