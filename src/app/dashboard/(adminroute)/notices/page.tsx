"use client";
import { uploadImageToImgBB } from "@/lib/utils/imgbbImageHoster";
import {
  useAddNoticeMutation,
  useGetNoticesQuery,
} from "@/redux/features/notices/noticeApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const NoticePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });
  const [isUploadingImage, setUploadingImage] = useState(false);
  const [addNoticeData, { isLoading: isUploadingNotice, isSuccess }] =
    useAddNoticeMutation();
  const { data: allNotices, isLoading: isGettingAllNotices } =
    useGetNoticesQuery();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let noticeImgUrl;

    if (formData.image) {
      const imageData = new FormData();
      imageData.append("image", formData.image);
      setUploadingImage(true);
    }

    try {
      if (formData.image)
        noticeImgUrl = await uploadImageToImgBB(formData.image);
      if (noticeImgUrl) setUploadingImage(false);

      await addNoticeData({
        title: formData.title,
        description: formData.description,
        resourceUrl: noticeImgUrl,
      }).unwrap();

      if (isSuccess) {
        Swal.fire({
          icon: "success",
          text: "Notice added successfully",
        });
        // Reset the form
        setFormData({
          title: "",
          description: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        text: error.data?.message,
      });
      alert("Failed to upload image.");
    }
  };

  if (isGettingAllNotices)
    return <span className="loading loading-spinner"></span>;

  return (
    <section className="">
      <div className="top-part-wrapper mb-6 flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Notices</h3>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-primary btn-sm"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onClick={() => document.getElementById("notice_modal")?.showModal()}
        >
          Add Notice
        </button>
      </div>

      <div className="notices-wrapper grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(allNotices) &&
          allNotices.map((notice) => (
            <div key={notice._id} className="rounded-md border p-3">
              <Image
                src={notice.resourceUrl || "/notice.jpg"}
                alt={""}
                height={100}
                width={200}
                className="h-[200px] w-full border-b object-cover"
              />
              <div className="flex items-center justify-between">
                <h3 className="my-1 text-xl font-semibold">{notice.title}</h3>
                <div
                  className={`badge ${notice.isActive ? "badge-success" : "badge-error"}`}
                >
                  {notice.isActive ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="flex justify-between">
                <Link href={"/"} className="btn btn-outline btn-sm">
                  Read More
                </Link>
                <div className="actions flex items-center gap-3">
                  <FiEdit className="cursor-pointer" />
                  <MdDelete className="cursor-pointer text-xl" />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Notice add modal */}
      <dialog id="notice_modal" className="modal z-[-1]">
        <div className="modal-box">
          <div className="">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUploadingImage || isUploadingNotice}
                >
                  {(isUploadingImage || isUploadingNotice) && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Submit
                </button>
                {isSuccess && (
                  <button className="btn btn-success btn-sm">
                    Notice added successfully.
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default NoticePage;
