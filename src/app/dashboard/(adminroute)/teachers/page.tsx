"use client";
import TeacherCard from "@/components/dashboard/TeacherCard";
import Spinner from "@/components/shared/Spinner";
import { uploadImageToImgBB } from "@/lib/utils/imgbbImageHoster";
import {
  useAddTeacherMutation,
  useGetAllTeachersQuery,
} from "@/redux/features/teachers/teachersApiSlice";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
type FormValues = {
  name: string;
  about?: string;
  phone: string;
  email: string;
  photo: FileList; // Represents the image file
};

const TeachersPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [addNewTeacher, { isLoading: isAddingTeacher }] =
    useAddTeacherMutation();
  const [imageUploading, setImageUploading] = useState(false);
  const { data: teachers, isLoading: isGettingTeachers } =
    useGetAllTeachersQuery();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setImageUploading(true);
    const photoUrl = await uploadImageToImgBB(data.photo[0]);
    if (photoUrl) setImageUploading(false);

    try {
      const response = await addNewTeacher({
        name: data.name,
        about: data.about,
        phone: data.phone,
        email: data.email,
        photoUrl,
      }).unwrap();

      if (response) {
        Swal.fire({
          icon: "success",
          text: "Teacher added successfully",
        });
      }
    } catch (ex) {
      Swal.fire({
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        text: ex?.data?.message,
      });
    }
  };

  if (isGettingTeachers) return <Spinner />;

  return (
    <section className="">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold lg:text-3xl">All Teachers</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            document
              .getElementById("add_teacher_modal")
              ?.classList.add("modal-open");
          }}
        >
          Add New
        </button>
      </div>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(teachers) &&
          teachers.map((teacher) => (
            <TeacherCard key={teacher._id} props={teacher} />
          ))}
      </div>

      {/* add teacher modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="add_teacher_modal" className="modal">
        <div className="modal-box">
          <div className="">
            <h3 className="mb-4 text-2xl font-bold">
              Teacher Information Form
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-4">
                <label className="block">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <span className="text-sm text-error">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* About */}
              <div className="mb-4">
                <label className="block">About</label>
                <textarea
                  {...register("about")}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block">Phone</label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Phone must be at least 11 digits",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <span className="text-sm text-error">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <span className="text-sm text-error">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Photo */}
              <div className="mb-4">
                <label className="block">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: "Photo is required" })}
                  className="file-input file-input-bordered w-full"
                />
                {errors.photo && (
                  <span className="text-sm text-error">
                    {errors.photo.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isAddingTeacher || imageUploading}
                className="btn btn-primary w-full"
              >
                {isAddingTeacher ? "Submitting.." : "Submit"}
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
                    .getElementById("add_teacher_modal")
                    ?.classList.remove("modal-open");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default TeachersPage;
