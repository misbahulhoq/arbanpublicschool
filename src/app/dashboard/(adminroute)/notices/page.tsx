"use client";
import { uploadImageToImgBB } from "@/lib/utils/imgbbImageHoster";
import { useAddNoticeMutation } from "@/redux/features/notices/noticeApi";
import React, { useState } from "react";
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
    setUploadingImage(true);

    if (!formData.image) {
      alert("Please select an image to upload.");
      return;
    }
    const imageData = new FormData();
    imageData.append("image", formData.image);

    try {
      const noticeImgUrl = await uploadImageToImgBB(formData.image);
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

  return (
    <section className="">
      <div className="top-part-wrapper flex items-center justify-between gap-4">
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
