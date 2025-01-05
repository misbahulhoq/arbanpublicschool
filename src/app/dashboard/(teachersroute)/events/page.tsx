/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import EventCard from "@/components/dashboard/EventCard";
import Spinner from "@/components/shared/Spinner";
import {
  useAddNewEventMutation,
  useGetAllEventsQuery,
} from "@/redux/features/events/eventsApiSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const EventsPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [addEventData, { isLoading: isUploadingEvent }] =
    useAddNewEventMutation();
  const { data: events, isLoading: isGettingEvents } = useGetAllEventsQuery();
  console.log(events);

  //   @ts-ignore
  const onImageChange = (event) => {
    const files = Array.from(event.target.files);
    //   @ts-ignore
    const previews = files.map((file) => URL.createObjectURL(file));
    //   @ts-ignore
    setImagePreviews(previews);
  };

  //   @ts-ignore
  const onSubmit = async (data) => {
    const { images, title, description } = data;
    const uploadedImageUrls = [];
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    try {
      setUploading(true);

      // Iterate over each image and upload it separately
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const result = await response.json();

        if (result.success) {
          uploadedImageUrls.push(result.data.url); // Save the image URL
        } else {
          console.error("Image upload failed:", result.error.message);
        }
      }

      if (uploadedImageUrls.length > 0) {
        alert("All images uploaded successfully!");
      } else {
        alert("No images were uploaded.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
      addEventData({
        title,
        description,
        images: uploadedImageUrls,
      })
        .unwrap()
        .then(() => {
          reset();
        });
      setImagePreviews([]);
    }
  };

  if (isGettingEvents) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Events</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            document
              .getElementById("add_event_modal")
              ?.classList.add("modal-open");
          }}
        >
          Add Event
        </button>
      </div>

      <div className="mx-auto grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(events) &&
          events.map((ev) => {
            return <EventCard key={ev._id} props={ev} />;
          })}

        {/* {[1, 2, 3, 4, 5].map((item) => (
          <EventCard key={item} />
        ))} */}
      </div>

      {/* Add new even modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="add_event_modal" className="modal">
        <div className="modal-box">
          <div className="">
            <h2 className="mb-4 text-center text-xl font-bold">Event Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter Event Title"
                  className="input input-bordered w-full"
                  {...register("title", { required: "Title is required" })}
                />
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
                  className="textarea textarea-bordered w-full"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
              </div>

              {/* Image Upload Field */}
              <div>
                <label htmlFor="images" className="block text-sm font-medium">
                  Upload Images
                </label>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  {...register("images", {
                    required: "Please select at least one image",
                  })}
                  onChange={onImageChange}
                />
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Image Previews:</h3>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {imagePreviews.map((src, index) => (
                      <Image
                        key={index}
                        src={src}
                        alt={`Preview ${index}`}
                        height={80}
                        width={80}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading || isUploadingEvent}
                className="btn btn-primary btn-block"
              >
                {uploading || isUploadingEvent ? "Uploading..." : "Submit"}
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  document
                    .getElementById("add_event_modal")
                    ?.classList.remove("modal-open");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EventsPage;
