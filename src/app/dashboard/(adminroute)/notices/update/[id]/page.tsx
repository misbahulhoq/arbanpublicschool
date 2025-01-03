"use client";
import {
  useGetNoticeByIdQuery,
  useUpdateNoticeByIdMutation,
} from "@/redux/features/notices/noticeApi";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

type Notice = {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  resourceUrl?: string;
};

const NoticeUpdatePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [noticeId, setNoticeId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Notice>();

  const { data: fetchedNotice, isLoading: retreivingNotice } =
    useGetNoticeByIdQuery(noticeId);
  const [addUpdateNoticeData, { isLoading: isUpdatingNotice }] =
    useUpdateNoticeByIdMutation();

  useEffect(() => {
    params.then((res) => setNoticeId(res.id));
    if (fetchedNotice) {
      setNotice(fetchedNotice);
      reset(fetchedNotice);
    }
  }, [fetchedNotice, params, reset]);

  const onSubmit: SubmitHandler<Notice> = async (data) => {
    console.log("submitted data", data);
    try {
      const response = await addUpdateNoticeData({
        id: notice?._id,
        body: data,
      }).unwrap();
      console.log(response);
      if (response) {
        Swal.fire({
          icon: "success",
          text: "Notice updated successfully",
        });
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        text: ex.data.message,
      });
    }
  };

  if (!noticeId || retreivingNotice)
    return <span className="loading loading-spinner"></span>;
  return (
    <div className="max-w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder=""
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isActive")}
            defaultChecked={notice?.isActive}
            className="checkbox"
          />
          <span>Active</span>
        </div>

        <div>
          <label className="block text-sm font-medium">Resource URL</label>
          <input
            type="text"
            {...register("resourceUrl")}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? "Submitting..." : "Update Notice"}
        </button>
      </form>
    </div>
  );
};

export default NoticeUpdatePage;
