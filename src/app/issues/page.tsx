"use client";
import { useAddIssueDataMutation } from "@/redux/features/issues/issuesApi";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

type FormData = {
  submittedBy: string;
  subject?: string;
  issue: string;
  priority: "low" | "medium" | "high";
  status: string;
};

const IssuesForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { status: "pending" },
  });
  const [addIssueData, { isLoading }] = useAddIssueDataMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await addIssueData(data).unwrap();
      console.log(response);
      if (response._id) {
        Swal.fire({
          icon: "success",
          text: "Issue Submitted Successfully.",
        });
        reset();
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        text: ex.message,
      });
    }
  };

  return (
    <section className="container-center py-6">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-center text-2xl font-bold">Report an Issue</h2>
        <p className="pb-3">
          Did you find any issue in this website? Report it here.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium">
              Your Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              {...register("submittedBy", { required: "Name is required" })}
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
              <p className="mt-1 text-sm text-error">{errors.issue.message}</p>
            )}
          </div>

          {/* Priority Select Field */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium">
              Priority
            </label>
            <select
              id="priority"
              {...register("priority", { required: "Priority is required" })}
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-block sm:btn-wide"
            >
              {isLoading && <span className="loading loading-spinner"></span>}
              {isLoading ? "Submitting.." : "Submit Issue"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default IssuesForm;
