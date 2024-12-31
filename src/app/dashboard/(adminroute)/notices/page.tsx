"use client";
import { uploadImageToImgBB } from "@/lib/utils/imgbbImageHoster";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the form data type
interface NoticeFormData {
  title: string;
  description: string;
  image?: FileList; // Optional field for image
}

const NoticePage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //reset,
  } = useForm<NoticeFormData>();

  // Handler for form submission
  const onSubmit: SubmitHandler<NoticeFormData> = async (data) => {
    try {
      let hostedImageUrl = null;

      // Upload image if provided
      if (data.image && data.image[0]) {
        console.log(data.image[0].type);
        hostedImageUrl = await uploadImageToImgBB(data.image[0]);
        setImageUrl(hostedImageUrl); // Save for display
      }

      console.log({
        title: data.title,
        description: data.description,
        imageUrl: hostedImageUrl,
      });

      //reset(); // Reset the form
      alert("Notice created successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to create notice. Please try again.");
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
      <dialog id="notice_modal" className="modal">
        <div className="modal-box">
          <div className="">
            <h2 className="mb-4 text-lg font-semibold">Create Notice</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="input input-bordered w-full"
                  placeholder="Enter the title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-error">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter the description"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-error">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Image Upload Field */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium">
                  Image (Optional)
                </label>
                <input
                  id="image"
                  type="file"
                  {...register("image")}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
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
